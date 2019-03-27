let userNumbers = 0;

// 观察者
class Observer {
    constructor() {
        this.id = ++userNumbers;
    }

    notify(update) {
        console.log(`User ${this.id} observed new update!`, update);
    }
}

// 被观察者
class Subject {
    constructor() {
        this.subscribers = [];   // list of subscriber objects
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unSubscribe(unSubscriber) {
        this.subscribers = this.subscribers.filter(subscriber => {
            return subscriber.id !== unSubscriber.id;
        });
    }

    dispatch(update) {
        this.subscribers.forEach(subscriber => {
            subscriber.notify(update);
        })
    }
}

console.log('----- Instantiating 3 Observers and 1 Subject -----');
const newsletter = new Subject();
const user1 = new Observer();
const user2 = new Observer();
const user3 = new Observer();

// In another words, the observer starts observing the subject
console.log('----- Subscribing 3 Observers -----');
newsletter.subscribe(user1);
newsletter.subscribe(user2);
newsletter.subscribe(user3);

console.log('----- Dispatching a event from Subject -----');
newsletter.dispatch('Breaking News');

// In another words, the unsubscribed observer stops observing the subject
console.log('----- Unsubscribing the first Observer -----');
newsletter.unSubscribe(user1);

console.log('----- Dispatching a event from Subject again -----');
newsletter.dispatch('Weather turns cold!');
