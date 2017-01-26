import { MongoObservable } from "meteor-rxjs";
import {Records, Traders} from "../models/trading.model";

export const RecordCollection = new MongoObservable.Collection<Records>("record-collection");

export const TraderCollection = new MongoObservable.Collection<Traders>("traders-collection");

function loggedIn() {
  return !!Meteor.user();
}
 
RecordCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});

TraderCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});