import { assert } from 'chai';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Stuffs } from './Stuff';

/* eslint-env mocha */

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
Meteor.methods({
  'test.resetDatabase': () => resetDatabase(),
});

describe('Stuff', function () {
  const goodData = {
    name: 'Test Item',
    quantity: 1,
    owner: 'john@foo.com',
    condition: 'good',
  };

  beforeEach(function (done) {
    // We need to wait until the method call is done before moving on, so we
    // use Mocha's async mechanism (calling a done callback)
    Meteor.call('test.resetDatabase', done);
  });

  it('Can insert Stuff', () => {
    const id = Stuffs.insert(goodData);
    assert.isNotNull(id);
    const badData = {
      name: 'Test Item',
      quantity: 1,
      owner: 'john@foo.com',
      condition: 'most excellent',
    };
    try {
      Stuffs.insert(badData);
      assert.fail('Should have failed the insert because condition');
    } catch (e) {
      // this is ok.
    }
  });
  it('Can find Stuff', () => {
    const empty = Stuffs.find({}).fetch();
    assert.strictEqual(empty.length, 0, 'Should be empty');
    Stuffs.insert(goodData);
    const item = Stuffs.find({ owner: 'john@foo.com' }).fetch();
    assert.strictEqual(item.length, 1, 'Should have one item.');
  });
  it('Can update Stuff', () => {
    const _id = Stuffs.insert(goodData);
    const orig = Stuffs.find({ _id }).fetch()[0];
    assert.strictEqual(orig.name, goodData.name);
    Stuffs.update({ _id }, { $set: { name: 'Changed Item' } });
    const changed = Stuffs.find({ _id }).fetch()[0];
    assert.strictEqual(changed.name, 'Changed Item');
  });
  it('Can remove Stuff', () => {
    const _id = Stuffs.insert(goodData);
    assert.strictEqual(Stuffs.find().count(), 1);
    Stuffs.remove({ _id });
    assert.strictEqual(Stuffs.find().count(), 0);
  });
});
