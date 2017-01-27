import { RecordCollection } from "../collections/trading.collection";
import { TraderCollection } from "../collections/trading.collection";
import { Meteor } from 'meteor/meteor';

// See: https://angular-meteor.com/tutorials/socially/angular2/meteor-methods
Meteor.methods({

  requestTrade: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {
      // Client side code doesn't allow positional operator ($)
      console.log('requestTrade() - starting')

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
        console.log(record_id)
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
      console.log('requestTrade() - done')
    }
  },

  acceptTrade: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {
      // Client side code doesn't allow positional operator ($)
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
      console.log('done')
    }
  },

  returnRecord: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {
      // Client side code doesn't allow positional operator ($)
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
      console.log('done')
    }
  }

});