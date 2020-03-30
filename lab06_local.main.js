// Import built-in Node.js package path.
const path = require('path');

/**
 * Import the ServiceNowConnector class from local Node.js module connector.js
 *   and assign it to constant ServiceNowConnector.
 * When importing local modules, IAP requires an absolute file reference.
 * Built-in module path's join method constructs the absolute filename.
 */
const ServiceNowConnector = require(path.join(__dirname, '/connector.js'));

/**
 * Import built-in Node.js package events' EventEmitter class and
 * assign it to constant EventEmitter. We will create a child class
 * from this class.
 */
const EventEmitter = require('events').EventEmitter;

/**
 * The ServiceNowAdapter class.
 *
 * @summary ServiceNow Change Request Adapter
 * @description This class contains IAP adapter properties and methods that IAP
 *   brokers and products can execute. This class inherits the EventEmitter
 *   class.
 */
class ServiceNowAdapter extends EventEmitter {

  /**
   * Here we document the ServiceNowAdapter class' callback. It must follow IAP's
   *   data-first convention.
   * @callback ServiceNowAdapter~requestCallback
   * @param {(object|string)} responseData - The entire REST API response.
   * @param {error} [errorMessage] - An error thrown by REST API call.
   */

  /**
   * Here we document the adapter properties.
   * @typedef {object} ServiceNowAdapter~adapterProperties - Adapter
   *   instance's properties object.
   * @property {string} url - ServiceNow instance URL.
   * @property {object} auth - ServiceNow instance credentials.
   * @property {string} auth.username - Login username.
   * @property {string} auth.password - Login password.
   * @property {string} serviceNowTable - The change request table name.
   */

  /**
   * @memberof ServiceNowAdapter
   * @constructs
   *
   * @description Instantiates a new instance of the Itential ServiceNow Adapter.
   * @param {string} id - Adapter instance's ID.
   * @param {ServiceNowAdapter~adapterProperties} adapterProperties - Adapter instance's properties object.
   */
  constructor(id, adapterProperties) {
    // Call super or parent class' constructor.
    super();
    // Copy arguments' values to object properties.
    this.id = id;
    this.props = adapterProperties;
    // Instantiate an object from the connector.js module and assign it to an object property.
    this.connector = new ServiceNowConnector({
      // url: this.props.url,
      // username: this.props.auth.username,
      // password: this.props.auth.password,
      // serviceNowTable: this.props.serviceNowTable
      // For local testing
      url: 'https://dev94923.service-now.com/',
      username: 'admin',
      password: 'Payton01',
      serviceNowTable: 'change_request'      
    });
  }

  /**
   * @memberof ServiceNowAdapter
   * @method connect
   * @summary Connect to ServiceNow
   * @description Complete a single healthcheck and emit ONLINE or OFFLINE.
   *   IAP calls this method after instantiating an object from the class.
   *   There is no need for parameters because all connection details
   *   were passed to the object's constructor and assigned to object property this.props.
   */
  connect() {
    // As a best practice, Itential recommends isolating the health check action
    // in its own method.
    this.healthcheck();
  }

  /**
   * @memberof ServiceNowAdapter
   * @method healthcheck
   * @summary Check ServiceNow Health
   * @description Verifies external system is available and healthy.
   *   Calls method emitOnline if external system is available.
   *
   * @param {ServiceNowAdapter~requestCallback} [callback] - The optional callback
   *   that handles the response.
   */
  healthcheck(callback) {
    // We will build this method in a later lab. For now, it will emulate
    // a healthy integration by emmitting ONLINE.
    this.emitOnline();
  }

  /**
   * @memberof ServiceNowAdapter
   * @method emitOffline
   * @summary Emit OFFLINE
   * @description Emits an OFFLINE event to IAP indicating the external
   *   system is not available.
   */
  emitOffline() {
    this.emitStatus('OFFLINE');
    log.warn('ServiceNow: Instance is unavailable.');
  }

  /**
   * @memberof ServiceNowAdapter
   * @method emitOnline
   * @summary Emit ONLINE
   * @description Emits an ONLINE event to IAP indicating external
   *   system is available.
   */
  emitOnline() {
    this.emitStatus('ONLINE');
    log.info('ServiceNow: Instance is available.');
  }

  /**
   * @memberof ServiceNowAdapter
   * @method emitStatus
   * @summary Emit an Event
   * @description Calls inherited emit method. IAP requires the event
   *   and an object identifying the adapter instance.
   *
   * @param {string} status - The event to emit.
   */
  emitStatus(status) {
    this.emit(status, { id: this.id });
  }

  /**
   * @memberof ServiceNowAdapter
   * @method getRecord
   * @summary Get ServiceNow Record
   * @description Retrieves a record from ServiceNow.
   *
   * @param {ServiceNowAdapter~requestCallback} callback - The callback that
   *   handles the response.
   */
  getRecord(callback) {
    /**
     * Write the body for this function.
     * The function is a wrapper for this.connector's get() method.
     * Note how the object was instantiated in the constructor().
     * get() takes a callback function.
     */
      this.connector.get((data, error) => {
        if (error) {
          console.error(`\nError returned from GET request:\n${JSON.stringify(error)}`);
          // return error;
          callback(error);
        }
            if (data.hasOwnProperty('body')) {
 /*             
              // initial JSON
// var ips = {ipId1: {}, ipId2: {}};
var ips = {JSON.parse(data.body)};


// Solution1
Object.keys(ips).forEach(function(key) {
  ips[key] = {name: 'value', anotherName: 'another value'};
});

*/
/*
// Solution 2
Object.keys(ips).forEach(function(key) {
  Object.assign(ips[key],{name: 'value', anotherName: 'another value'});
}); */
              var myObj = (JSON.parse(data.body));
              
              for (var i = 0; i < myObj.result.length; i += 1) {
                      var x = myObj.result[i].number;
                      console.log(x);
                      }
              
              
              console.log(`\nResponse returned from GET before i change it :${JSON.stringify(data.body)}`);
              var body_array = (JSON.parse(data.body));
              // console.log(JSON.parse(data.body));
              // console.log((`Accessing JSON Element ${body_array.result[0].number}`));
              //cart.contents[1].productName )
              var num_results = body_array.result.length;
              var change_ticket = [];
              //change_ticket = "{";
              for(var i = 0; i < num_results; i += 1) {
                var result_array = (JSON.parse(data.body).result);
                //var body_array = (JSON.parse(data.body));
                // var change_ticket = Array(result_array.result);
                // var result_array = data.body;
                // var change_ticket = { name: "John", age: 30, city: "New York" };
                //var change_ticket = {};
                
               /* 
                change_ticket = change_ticket + `"${i}" :` +
                `{"change_ticket_number" : "${result_array[i].number}",
                "active" : "${result_array[i].active}",
                "priority" : "${result_array[i].priority}"
                },`;
                */
                // to do someText = someText.replace(/(\r\n|\n|\r)/gm," ");
                change_ticket.push({"change_ticket_number" : result_array[i].number, "active" : result_array[i].active, "priority" : result_array[i].priority,
                                   "description" : result_array[i].description, "work_start" : result_array[i].work_start, "work_end" : result_array[i].work_end,
                                   "change_ticket_key" : result_array[i].sys_id});
                
                // change_ticket.change_ticket_number = result_array[i].number; // rename number to change_ticket_number
                /* change_ticket.active = result_array[i].active;
                change_ticket.priority = result_array[i].priority;
                change_ticket.description = result_array[i].description;
                change_ticket.work_start = result_array[i].work_start;
                change_ticket.work_end = result_array[i].work_end;  
                change_ticket.change_ticket_key = result_array[i].sys_id;  *///rename sys_id to change_ticket_key */
                //change_ticket.sys_domain_link = result_array.sys_domain.link; // just testing nested values
              
                // console.log('Begin From this.connector.post');
                // console.log(change_ticket);
                // console.log('End this.connector.post');
                // console.log(`Response from POST ${data.body}`);
                //console.log(`Response from POST ${change_ticket}`);
                console.log(typeof(change_ticket));
                // console.log(change_ticket);
                console.log(JSON.stringify(change_ticket));
                // console.log(Object.keys(body_array).length);

              } 
              // change_ticket = change_ticket + "}";
              console.log(change_ticket);
              // console.log(JSON.parse(data.body).result);
             // callback(JSON.parse(change_ticket));    // doesn't work           
            callback(JSON.stringify(change_ticket));            
            }   
      
      
      });
    }    
    

  /**
   * @memberof ServiceNowAdapter
   * @method postRecord
   * @summary Create ServiceNow Record
   * @description Creates a record in ServiceNow.
   *
   * @param {ServiceNowAdapter~requestCallback} callback - The callback that
   *   handles the response.
   */
  postRecord(callback) {
    /**
     * Write the body for this function.
     * The function is a wrapper for this.connector's post() method.
     * Note how the object was instantiated in the constructor().
     * post() takes a callback function.
     */
      this.connector.post((data, error) => {
          if (error) {
            //console.error(`\nError returned from POST request:\n${JSON.stringify(error)}`);
            callback(error);
          }
            if (data.hasOwnProperty('body')) {
              var body_array = (JSON.parse(data.body));
              var num_results = Object.keys(body_array).length;
              var change_ticket = {};
              for(var i = 0; i < num_results; i += 1) {
                var result_array = (JSON.parse(data.body).result);
                //var body_array = (JSON.parse(data.body));
                // var change_ticket = Array(result_array.result);
                // var result_array = data.body;
                // var change_ticket = { name: "John", age: 30, city: "New York" };
                //var change_ticket = {};
                change_ticket.change_ticket_number = result_array.number; // rename number to change_ticket_number
                change_ticket.active = result_array.active;
                change_ticket.priority = result_array.priority;
                change_ticket.description = result_array.description;
                change_ticket.work_start = result_array.work_start;
                change_ticket.work_end = result_array.work_end;  
                change_ticket.change_ticket_key = result_array.sys_id;  //rename sys_id to change_ticket_key */
                //change_ticket.sys_domain_link = result_array.sys_domain.link; // just testing nested values
              
                // console.log('Begin From this.connector.post');
                // console.log(change_ticket);
                // console.log('End this.connector.post');
                // console.log(`Response from POST ${data.body}`);
                //console.log(`Response from POST ${change_ticket}`);
                console.log(typeof(change_ticket));
                console.log(JSON.stringify(change_ticket));
                console.log(Object.keys(body_array).length);
                console.log(`i: ${i}`);                
                callback(JSON.stringify(change_ticket));
              } 
          }
              
         
        });    
    }

}
module.exports = ServiceNowAdapter;

// for testing) 
    
function main() {
  console.log(`\nFrom main() function`);
  var test_ServiceNowAdapter = new ServiceNowAdapter();
  // test_ServiceNowAdapter.getRecord();
  
  test_ServiceNowAdapter.getRecord( (data, error) => {
   // console.log(`\nResponse returned from GET JSON.stringify request:${JSON.stringify(data)}`);
 console.log(`\nResponse returned from GET JSON.parse request:${data}`);  
    });
/*  test_ServiceNowAdapter.postRecord( (data, error) => {
      if (data.hasOwnProperty('body')) {
        // console.log(`Has body`);
        // console.log(JSON.parse(data.body).result);
        // body_array = JSON.parse(data.body);
        result_array = (JSON.parse(data.body).result);
      
        // console.log(data.body);
        // console.log(typeof(body_array));
        // console.log(typeof(result_array));
      
        // console.log(result_array);
        const change_ticket = Array();
        change_ticket.change_ticket_number = result_array.number; // rename number to change_ticket_number
        change_ticket.active = result_array.active;
        change_ticket.priority = result_array.priority;
        change_ticket.description = result_array.description;
        change_ticket.work_start = result_array.work_start;
        change_ticket.work_end = result_array.work_end;  
        change_ticket.change_ticket_key = result_array.sys_id;  //rename sys_id to change_ticket_key 
        //change_ticket.sys_domain_link = result_array.sys_domain.link; // just testing nested values
      
        console.log(change_ticket);
        return(change_ticket);
      }
    else {
    console.log('Object returned from From this.connector.post');
    console.log(data);      
    }
      
    });
 */

}

main();