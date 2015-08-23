/// <reference path="./typings.d.ts" />
require('source-map-support').install();
import { EventEmitter as EventEmitter } from 'events';
this.EventEmitter = EventEmitter;
import assert = require('power-assert');
import StarNetwork from '../public/script/network/starnetwork';
import VirtualRemoteRepository from '../public/script/network/virtualremoterepository';

describe('StarNetwork', () => {
    it('connect. (server -> client)', () => {
        let repos = new VirtualRemoteRepository(2);
        return Promise.all([
            StarNetwork.new(repos.remotes.get('0'), true, 2),
            StarNetwork.new(repos.remotes.get('1'), false, 2)
        ]);
    });

    it('connect. (client -> server)', () => {
        let repos = new VirtualRemoteRepository(2);
        return Promise.all([
            StarNetwork.new(repos.remotes.get('1'), false, 2),
            StarNetwork.new(repos.remotes.get('0'), true, 2)
        ]);
    });
});
