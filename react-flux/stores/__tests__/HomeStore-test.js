jest.dontMock('../../constants/Constants');
jest.dontMock('../Home');
jest.dontMock('object-assign');

describe('HomeStore', function() {

  var Constants = require('../../constants/Constants');
  var AppDispatcher;
  var HomeStore;
  var callback;


  var actionPhotoCreate = {
    actionType: TodoConstants.CREATE_PHOTO,
    data : {file: new Object(), title: 't', description: 'd', user_id: 'id'}
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    HomeStore = require('../HomeStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with no to-do items', function() {
    var all = HomeStore.getAllData();
    expect(all).toEqual({});
  });

  it('creates a photo', function() {
    callback(actionPhotoCreate);
    var all = HomeStore.getAllData();
    var keys = Object.keys(all);
    expect(keys.length).toBe(4);
    expect(all[keys[1]].text).toEqual('t');
  });

});
