import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import { Demo } from "../../../../shared/models/demo.model";
import { DemoCollection } from "../../../../shared/collections/demo.collection";

@Injectable()
export class DemoDataService {
  private data: ObservableCursor<Demo>;

  constructor() {
    this.data = DemoCollection.find({});
  }

  public getData(): ObservableCursor<Demo> {
    return this.data;
  }
}
