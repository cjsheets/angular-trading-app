import { Meteor } from "meteor/meteor"
import {DemoCollection} from "../../../shared/collections/demo.collection";
import {Demo} from "../../../shared/models/demo.model";
import { loadRecords, loadTraders } from "../fixtures/trading.fixture";

declare let WebApp: any;
declare let require: any;

const request = require('request');
const url     = require('url');

export class Main {
  start(): void {
    this.initFakeData();
    this.initFakeDemoData();
    this.addProxyHandler();
  }

  addProxyHandler(): void {
    let apiKey = Meteor.settings.public.last_fm.key;
    let baseUrl = 'http://ws.audioscrobbler.com/2.0/?';
    WebApp.connectHandlers.use((req, res, next) => {
      if(!(url.parse(req.url, true).pathname == '/api/proxy'))
        return next(); // only respond to api/proxy
      let queryData = url.parse(req.originalUrl, true).query; // parse query string
      if(!queryData.u || !Meteor.users.findOne(queryData.u))
        return next(); // only allow logged in users access to API
      var proxyUrl = baseUrl + url.parse(req.originalUrl).query.replace(/(&?)u=.*?&/g, '')
        + '&api_key=' + apiKey; // replace() removes the userid string
        console.log(proxyUrl)
      req.pipe(request(proxyUrl)).pipe(res);
    });
  }

  initFakeData(): void {
    loadRecords();
    loadTraders();
  }

  initFakeDemoData(): void {
    if (DemoCollection.find({}).cursor.count() === 0) {
      const data: Demo[] = [{
        name: "Dotan",
        age: 25
      }, {
        name: "Liran",
        age: 26
      }, {
        name: "Uri",
        age: 30
      }];
      data.forEach((obj: Demo) => {
        DemoCollection.insert(obj);
      });
    }
  }
}
