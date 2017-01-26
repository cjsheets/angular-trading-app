import { RecordCollection } from "../collections/trading.collection";
import { TraderCollection } from "../collections/trading.collection";
import { Meteor } from 'meteor/meteor';

// See: https://angular-meteor.com/tutorials/socially/angular2/meteor-methods
Meteor.methods({

  acceptTrade: function (owner_id, requestor_id, record_id) {
    if (Meteor.isServer) {
      console.log('setting trader collection')
      TraderCollection.update(
        {"$and": [
          { "id": owner_id },
          { "offers.requestor_id": requestor_id },
          { "offers.record_id": record_id },
          { "offers.loan_status": false }
        ]},
      {"$set": { "offers.$.loan_status": true } }
      )
      console.log('done')
    }
  }

});