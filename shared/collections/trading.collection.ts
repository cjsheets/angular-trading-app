import { MongoObservable } from "meteor-rxjs";
import {Records, Traders} from "../models/trading.model";

export const RecordCollection = new MongoObservable.Collection<Records>("record-collection");

export const TraderCollection = new MongoObservable.Collection<Traders>("user-collection");
