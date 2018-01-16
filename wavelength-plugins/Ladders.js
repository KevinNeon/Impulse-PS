/***************************
* Ladders By Prince Sky *
* Using Economy for logging *
****************************/
'use strict';

exports.commands = {
	'!unoladder': true,
	unoladder: function (target, room, user) {
		let unoWins = 'Wins';
		if (!target) target = 100;
		target = Number(target);
		if (isNaN(target)) target = 100;
		if (!this.runBroadcast()) return;
		let keys = Db.unoladder.keys().map(name => {
			return {name: name, wins: Db.unoladder.get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Uno ladder is empty.");
		keys.sort(function (a, b) { return b.wins - a.wins; });
		this.sendReplyBox(rankLadder('Uno Kings', unoWins, keys.slice(0, target), 'wins') + '</div>');
	},
	resetunoladder: 'rul',
	rul: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target) return this.parse('/help rul');
		target = toId(target);
		Db.unoladder.remove(target);
		this.sendReply(target + " now has 0 uno wins.");
	},
	rulhelp: ['/rul [user] - Resets target user\'s uno wins to 0. Requires: &, ~'],

	'!tourladder': true,
	tourladder: function (target, room, user) {
		let tourWins = 'Wins';
		if (!target) target = 100;
		target = Number(target);
		if (isNaN(target)) target = 100;
		if (!this.runBroadcast()) return;
		let keys = Db.tourladder.keys().map(name => {
			return {name: name, wins: Db.tourladder.get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Tournaments ladder is empty.");
		keys.sort(function (a, b) { return b.wins - a.wins; });
		this.sendReplyBox(rankLadder('Tournament Masters', tourWins, keys.slice(0, target), 'wins') + '</div>');
	},
	resettourladder: 'rtl',
	rtl: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target) return this.parse('/help rtl');
		target = toId(target);
		Db.tourladder.remove(target);
		this.sendReply(target + " now has 0 tour wins.");
	},
	rtlhelp: ['/rtl [user] - Resets target user\'s tour wins to 0. Requires: &, ~'],
};
