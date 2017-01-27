import { RecordCollection } from "../collections/trading.collection";
import { TraderCollection } from "../collections/trading.collection";
import { Records } from "../models/trading.model";
import { Meteor } from 'meteor/meteor';

// See: https://angular-meteor.com/tutorials/socially/angular2/meteor-methods
Meteor.methods({

  addRecord: function (record: Records) {
    if (Meteor.isServer) {
      // Client side code doesn't allow positional operator ($)
      console.log('removeRecord() - starting')

      let uid = Meteor.userId()
      if(!uid)
        throw new Meteor.Error('404', 'Must be logged');
      
      RecordCollection.insert({ 
        id        : record.id,
        owner     : uid,
        name      : record.name,
        artist    : record.artist,
        image     : record.image,
        available : true
      });
    }
  },

  removeRecord: function (record_id) {
    if (Meteor.isServer) {
      // Client side code doesn't allow positional operator ($)
      console.log('removeRecord() - starting')

      let uid = Meteor.userId()
      if(!uid)
        throw new Meteor.Error('404', 'Must be logged');

      let recordIsMine = RecordCollection.findOne({"$and": [
          { "_id": record_id },
          { "owner": uid }
        ]});
      if(!recordIsMine)
        throw new Meteor.Error('400', 'The record doesn\'t exist or isn\'t owned by you');

      let recordIsAvailble = RecordCollection.findOne({"$and": [
          { "_id": record_id },
          { "owner": uid },
          { "available": true }
        ]});
      if(!recordIsAvailble)
        throw new Meteor.Error('400', 'The record is currently on loan');

      // Clear any requests involving this record
      TraderCollection.update({},
        {"$pull": { "offers": {
          "owner_id": uid,
          "record_id": record_id
        } } }, {multi: true}
      );
      TraderCollection.update({},
        {"$pull": { "requests": {
          "owner_id": uid,
          "record_id": record_id
        } } }, {multi: true}
      );
      // Remove the record
      RecordCollection.remove({ "_id": record_id });
    }
  },

  requestTrade: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {

      let uid = Meteor.userId()
      if(!uid)
        throw new Meteor.Error('404', 'Must be logged');

      let requestor = TraderCollection.findOne({ "id": requestor_id });
      if(!requestor) // Ensure requestor and owner are initialized
        TraderCollection.insert({ "id": requestor_id, "offers": [], "requests": [] });
      let owner = TraderCollection.findOne({ "id": owner_id });
      if(!requestor)
        TraderCollection.insert({ "id": owner_id, "offers": [], "requests": [] });

      let trade = TraderCollection.findOne({"$and": [
          { "id": requestor_id },
          { "requests.owner_id": owner_id },
          { "requests.record_id": record_id }
        ]});
      if(trade)
        throw new Meteor.Error('400', 'The trade was already requested');
      let record = RecordCollection.findOne({"$and": [
          { "_id": record_id },
          { "available": true }
        ]});
      if(!record)
        throw new Meteor.Error('404', 'The record is not available for trade');

      TraderCollection.update({ "id": requestor_id },
        {"$addToSet": {
          "requests": { 
            requestor_id: requestor_id,
            owner_id: owner_id,
            record_id: record_id,
            loan_status: false
        } } }
      );
      TraderCollection.update({ "id": owner_id },
        {"$addToSet": {
          "offers": { 
            requestor_id: requestor_id,
            owner_id: owner_id,
            record_id: record_id,
            loan_status: false
        } } }
      );
    }
  },

  acceptTrade: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {

      let uid = Meteor.userId()
      if(!uid)
        throw new Meteor.Error('404', 'Must be logged');

      TraderCollection.update({ "id": owner_id, "offers": {
        "$elemMatch": {
          "requestor_id": requestor_id,
          "record_id": record_id,
          "loan_status": false
        } } },
        {"$set": { "offers.$.loan_status": true } }
      );
      TraderCollection.update({ "id": requestor_id, "requests": {
        "$elemMatch": {
          "owner_id": owner_id,
          "record_id": record_id,
          "loan_status": false
        } } },
        {"$set": { "requests.$.loan_status": true } }
      );
      RecordCollection.update(
        { "_id": record_id },
        {"$set": { "available": false } }
      );
    }
  },

  declineTrade: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {

      let uid = Meteor.userId()
      if(!uid)
        throw new Meteor.Error('404', 'Must be logged');

      TraderCollection.update({ "id": owner_id },
        {"$pull": { "offers": {
          "requestor_id": requestor_id,
          "record_id": record_id,
          "loan_status": false
        } } }
      );
      TraderCollection.update({ "id": requestor_id },
        {"$pull": { "requests": {
          "owner_id": owner_id,
          "record_id": record_id,
          "loan_status": false
        } } }
      );
    }
  },

  returnRecord: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {

      let uid = Meteor.userId()
      if(!uid)
        throw new Meteor.Error('404', 'Must be logged');

      TraderCollection.update({ "id": owner_id },
        {"$pull": { "offers": {
          "requestor_id": requestor_id,
          "record_id": record_id,
          "loan_status": true
        } } }
      );
      TraderCollection.update({ "id": requestor_id },
        {"$pull": { "requests": {
          "owner_id": owner_id,
          "record_id": record_id,
          "loan_status": true
        } } }
      );
      RecordCollection.update(
        { "_id": record_id },
        {"$set": { "available": true } }
      );
    }
  }

});