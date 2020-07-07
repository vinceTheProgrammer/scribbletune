const seedrandom = require('seedrandom');
const index = require('../../index.js');

! function (n, t) {
    for (var e in t) n[e] = t[e]
}(exports, function (n) {
    var t = {};

    function e(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return n[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports
    }
    return e.m = n, e.c = t, e.d = function (n, t, r) {
        e.o(n, t) || Object.defineProperty(n, t, {
            enumerable: !0,
            get: r
        })
    }, e.r = function (n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(n, "__esModule", {
            value: !0
        })
    }, e.t = function (n, t) {
        if (1 & t && (n = e(n)), 8 & t) return n;
        if (4 & t && "object" == typeof n && n && n.__esModule) return n;
        var r = Object.create(null);
        if (e.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: n
            }), 2 & t && "string" != typeof n)
            for (var i in n) e.d(r, i, function (t) {
                return n[t]
            }.bind(null, i));
        return r
    }, e.n = function (n) {
        var t = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return e.d(t, "a", t), t
    }, e.o = function (n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }, e.p = "", e(e.s = 8)
}([function (n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isNote = function (n) {
        return /^[a-gA-G](?:#|b)?\d$/.test(n)
    }, t.expandStr = function (n) {
        return n = (n = (n = (n = JSON.stringify(n.split(""))).replace(/,"\[",/g, ", [")).replace(/"\[",/g, "[")).replace(/,"\]"/g, "]"), JSON.parse(n)
    }, t.shuffle = function (n) {
        var t = n.length - 1;
        return n.forEach((function (e, r) {
            var i = Math.round(Math.random() * t);
            n[r] = n[i], n[i] = e
        })), n
    }, t.sizzleMap = function (n) {
        void 0 === n && (n = 127);
        var t = Math.PI,
            e = [t / 6, t / 4, t / 3, t / 2, 2 * t / 3, 3 * t / 4, 5 * t / 6, t],
            r = [0, t / 6, t / 4, t / 3, t / 2, 2 * t / 3, 3 * t / 4, 5 * t / 6];
        return r.reverse(), e.concat(r).map((function (t) {
            return Math.round(Math.sin(t) * n)
        }))
    }, t.pickOne = function (n) {
        return n.length > 1 ? n[Math.round(index.myrng())] : n[0]
    }, t.dice = function () {
        return !!Math.round(index.myrng())
    }
}, function (n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = e(5),
        i = r.Chord.names(),
        o = e(0);
    t.getChord = function (n) {
        if (o.isNote(n)) throw new Error(n + " is not a chord!");
        var t = n.split("-"),
            e = r.Chord.tokenize(t[0]),
            i = e[0],
            u = e[1];
        "4" !== i[1] && "5" !== i[1] || (u = i[1], i = i.replace(/\d/, ""));
        var a = {
            "4th": "4",
            "5th": "5",
            "7th": "7",
            "9th": "9",
            "11th": "11",
            "13th": "13"
        };
        if (a[u] && (u = a[u]), !r.Chord.exists(u)) throw new TypeError("Invalid chord name: " + u);
        return (r.chord(u) || []).map((function (n) {
            var e = r.transpose.bind(null, i + (t[1] || 4))(n);
            return r.Note.simplify(e)
        }))
    }, t.chords = function () {
        var n = {
            4: "4th",
            5: "5th",
            7: "7th",
            9: "9th",
            11: "11th",
            13: "13th"
        };
        return i.map((function (t) {
            return /^\d+$/.test(t) && n[t] ? n[t] : t
        }))
    }
}, function (n, t, e) {
    "use strict";
    var r = this && this.__importStar || function (n) {
        if (n && n.__esModule) return n;
        var t = {};
        if (null != n)
            for (var e in n) Object.hasOwnProperty.call(n, e) && (t[e] = n[e]);
        return t.default = n, t
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = r(e(5));
    t.getScale = function (n) {
        n = (n = (n = n && n.toLowerCase()).replace("#5p", "#5P")).replace("#7m", "#7M");
        var t = i.Scale.tokenize(n)[1];
        if (!i.Scale.exists(t)) throw new Error(n + " does not exist!");
        return i.Scale.notes(n).map(i.Note.simplify)
    }, t.scales = function () {
        return i.Scale.names()
    }
}, function (n, t, e) {
    "use strict";
    var r = this && this.__assign || function () {
        return (r = Object.assign || function (n) {
            for (var t, e = 1, r = arguments.length; e < r; e++)
                for (var i in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
            return n
        }).apply(this, arguments)
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0),
        o = e(1),
        u = "undefined" != typeof window && e(9),
        a = {
            "1m": 2048,
            "2m": 4096,
            "3m": 6144,
            "4m": 8192,
            "1n": 512,
            "2n": 256,
            "4n": 128,
            "8n": 64,
            "16n": 32
        };
    t.clip = function (n) {
        if ("string" == typeof (n = r(r({}, {
                notes: ["C4"],
                pattern: "x",
                shuffle: !1,
                sizzle: !1,
                sizzleReps: 1,
                arpegiate: !1,
                subdiv: "4n",
                amp: 100,
                accentLow: 70,
                randomNotes: null
            }), n || {})).notes && (n.notes = n.notes.replace(/\s{2,}/g, " "), n.notes = n.notes.split(" ")), n.notes = n.notes.map((function (n) {
                return i.isNote(n) ? [n] : Array.isArray(n) ? (n.forEach((function (n) {
                    if (!i.isNote(n)) throw new TypeError("array must comprise valid notes")
                })), n) : !Array.isArray(n) && o.getChord(n) ? n = o.getChord(n) : void 0
            })), /[^x\-_\[\]R]/.test(n.pattern)) throw new TypeError("pattern can only comprise x - _ [ ], found " + n.pattern);
        if (n.shuffle && (n.notes = i.shuffle(n.notes)), n.randomNotes && "string" == typeof n.randomNotes && (n.randomNotes = n.randomNotes.replace(/\s{2,}/g, " "), n.randomNotes = n.randomNotes.split(/\s/)), n.randomNotes && (n.randomNotes = n.randomNotes.map((function (n) {
                return [n]
            }))), n.synth || n.instrument || n.sample || n.buffer || n.player || n.samples || n.sampler) return u(n);
        var t = [],
            e = 0,
            s = function (r, i) {
                r.forEach((function (r) {
                    if ("string" == typeof r) {
                        var o = null;
                        "x" === r && (o = n.notes[e], e++), "R" === r && (Math.round(Math.random()) || n.randomNotes) && (o = n.randomNotes ? n.randomNotes[Math.round(Math.random() * (n.randomNotes.length - 1))] : n.notes[e], e++), "x" !== r && "-" !== r && "R" !== r || t.push({
                            note: o,
                            length: i,
                            level: "R" !== r || n.randomNotes ? n.amp : n.accentLow
                        }), "_" === r && t.length && (t[t.length - 1].length += i), e === n.notes.length && (e = 0)
                    }
                    Array.isArray(r) && s(r, i / r.length)
                }))
            };
        if (s(i.expandStr(n.pattern), a[n.subdiv] || a["4n"]), n.sizzle) {
            var c = [],
                m = !0 === n.sizzle ? "sin" : n.sizzle,
                l = t.length,
                f = n.amp,
                d = n.sizzleReps,
                p = f / (l / d);
            if ("sin" === m || "cos" === m)
                for (var h = 0; h < l; h++) {
                    var P = Math[m](h * Math.PI / (l / d)) * f;
                    c.push(Math.round(Math.abs(P)))
                }
            if ("rampUp" === m)
                for (P = 0, h = 0; h < l; h++) h % (l / d) == 0 ? P = 0 : P += p, c.push(Math.round(Math.abs(P)));
            if ("rampDown" === m)
                for (P = f, h = 0; h < l; h++) h % (l / d) == 0 ? P = f : P -= p, c.push(Math.round(Math.abs(P)));
            for (h = 0; h < c.length; h++) t[h].level = c[h] ? c[h] : 1
        }
        if (n.accent) {
            if (/[^x\-]/.test(n.accent)) throw new TypeError("Accent can only have x and - characters");
            for (var M = 0, v = 0, y = t; v < y.length; v++) {
                var b = y[v];
                P = "x" === n.accent[M] ? n.amp : n.accentLow;
                n.sizzle && (P = (b.level + P) / 2), b.level = Math.round(P), (M += 1) === n.accent.length && (M = 0)
            }
        }
        return t
    }
}, function (n, t, e) {
    (function (n) {
        var e = {};
        ! function (n) {
            var t = n.DEFAULT_VOLUME = 90,
                e = (n.DEFAULT_DURATION = 128, n.DEFAULT_CHANNEL = 0, {
                    midi_letter_pitches: {
                        a: 21,
                        b: 23,
                        c: 12,
                        d: 14,
                        e: 16,
                        f: 17,
                        g: 19
                    },
                    midiPitchFromNote: function (n) {
                        var t = /([a-g])(#+|b+)?([0-9]+)$/i.exec(n),
                            r = t[1].toLowerCase(),
                            i = t[2] || "";
                        return 12 * parseInt(t[3], 10) + e.midi_letter_pitches[r] + ("#" == i.substr(0, 1) ? 1 : -1) * i.length
                    },
                    ensureMidiPitch: function (n) {
                        return "number" != typeof n && /[^0-9]/.test(n) ? e.midiPitchFromNote(n) : parseInt(n, 10)
                    },
                    midi_pitches_letter: {
                        12: "c",
                        13: "c#",
                        14: "d",
                        15: "d#",
                        16: "e",
                        17: "f",
                        18: "f#",
                        19: "g",
                        20: "g#",
                        21: "a",
                        22: "a#",
                        23: "b"
                    },
                    midi_flattened_notes: {
                        "a#": "bb",
                        "c#": "db",
                        "d#": "eb",
                        "f#": "gb",
                        "g#": "ab"
                    },
                    noteFromMidiPitch: function (n, t) {
                        var r, i = 0,
                            o = n;
                        t = t || !1;
                        return n > 23 && (o = n - 12 * (i = Math.floor(n / 12) - 1)), r = e.midi_pitches_letter[o], t && r.indexOf("#") > 0 && (r = e.midi_flattened_notes[r]), r + i
                    },
                    mpqnFromBpm: function (n) {
                        var t = Math.floor(6e7 / n),
                            e = [];
                        do {
                            e.unshift(255 & t), t >>= 8
                        } while (t);
                        for (; e.length < 3;) e.push(0);
                        return e
                    },
                    bpmFromMpqn: function (n) {
                        if (void 0 !== n[0]) {
                            0;
                            for (var t = 0, e = n.length - 1; e >= 0; ++t, --e) n[t] << e
                        }
                        return Math.floor(6e7 / n)
                    },
                    codes2Str: function (n) {
                        return String.fromCharCode.apply(null, n)
                    },
                    str2Bytes: function (n, t) {
                        if (t)
                            for (; n.length / 2 < t;) n = "0" + n;
                        for (var e = [], r = n.length - 1; r >= 0; r -= 2) {
                            var i = 0 === r ? n[r] : n[r - 1] + n[r];
                            e.unshift(parseInt(i, 16))
                        }
                        return e
                    },
                    translateTickTime: function (n) {
                        for (var t = 127 & n; n >>= 7;) t <<= 8, t |= 127 & n | 128;
                        for (var e = []; e.push(255 & t), 128 & t;) t >>= 8;
                        return e
                    }
                }),
                r = function (n) {
                    if (!this) return new r(n);
                    !n || null === n.type && void 0 === n.type || null === n.channel && void 0 === n.channel || null === n.param1 && void 0 === n.param1 || (this.setTime(n.time), this.setType(n.type), this.setChannel(n.channel), this.setParam1(n.param1), this.setParam2(n.param2))
                };
            r.NOTE_OFF = 128, r.NOTE_ON = 144, r.AFTER_TOUCH = 160, r.CONTROLLER = 176, r.PROGRAM_CHANGE = 192, r.CHANNEL_AFTERTOUCH = 208, r.PITCH_BEND = 224, r.prototype.setTime = function (n) {
                this.time = e.translateTickTime(n || 0)
            }, r.prototype.setType = function (n) {
                if (n < r.NOTE_OFF || n > r.PITCH_BEND) throw new Error("Trying to set an unknown event: " + n);
                this.type = n
            }, r.prototype.setChannel = function (n) {
                if (n < 0 || n > 15) throw new Error("Channel is out of bounds.");
                this.channel = n
            }, r.prototype.setParam1 = function (n) {
                this.param1 = n
            }, r.prototype.setParam2 = function (n) {
                this.param2 = n
            }, r.prototype.toBytes = function () {
                var n = [],
                    t = this.type | 15 & this.channel;
                return n.push.apply(n, this.time), n.push(t), n.push(this.param1), void 0 !== this.param2 && null !== this.param2 && n.push(this.param2), n
            };
            var i = function (n) {
                if (!this) return new i(n);
                this.setTime(n.time), this.setType(n.type), this.setData(n.data)
            };
            i.SEQUENCE = 0, i.TEXT = 1, i.COPYRIGHT = 2, i.TRACK_NAME = 3, i.INSTRUMENT = 4, i.LYRIC = 5, i.MARKER = 6, i.CUE_POINT = 7, i.CHANNEL_PREFIX = 32, i.END_OF_TRACK = 47, i.TEMPO = 81, i.SMPTE = 84, i.TIME_SIG = 88, i.KEY_SIG = 89, i.SEQ_EVENT = 127, i.prototype.setTime = function (n) {
                this.time = e.translateTickTime(n || 0)
            }, i.prototype.setType = function (n) {
                this.type = n
            }, i.prototype.setData = function (n) {
                this.data = n
            }, i.prototype.toBytes = function () {
                if (!this.type) throw new Error("Type for meta-event not specified.");
                var n = [];
                if (n.push.apply(n, this.time), n.push(255, this.type), Array.isArray(this.data)) n.push(this.data.length), n.push.apply(n, this.data);
                else if ("number" == typeof this.data) n.push(1, this.data);
                else if (null !== this.data && void 0 !== this.data) {
                    n.push(this.data.length);
                    var t = this.data.split("").map((function (n) {
                        return n.charCodeAt(0)
                    }));
                    n.push.apply(n, t)
                } else n.push(0);
                return n
            };
            var o = function (n) {
                if (!this) return new o(n);
                var t = n || {};
                this.events = t.events || []
            };
            o.START_BYTES = [77, 84, 114, 107], o.END_BYTES = [0, 255, 47, 0], o.prototype.addEvent = function (n) {
                return this.events.push(n), this
            }, o.prototype.addNoteOn = o.prototype.noteOn = function (n, i, o, u) {
                return this.events.push(new r({
                    type: r.NOTE_ON,
                    channel: n,
                    param1: e.ensureMidiPitch(i),
                    param2: u || t,
                    time: o || 0
                })), this
            }, o.prototype.addNoteOff = o.prototype.noteOff = function (n, i, o, u) {
                return this.events.push(new r({
                    type: r.NOTE_OFF,
                    channel: n,
                    param1: e.ensureMidiPitch(i),
                    param2: u || t,
                    time: o || 0
                })), this
            }, o.prototype.addNote = o.prototype.note = function (n, t, e, r, i) {
                return this.noteOn(n, t, r, i), e && this.noteOff(n, t, e, i), this
            }, o.prototype.addChord = o.prototype.chord = function (n, t, e, r) {
                if (!Array.isArray(t) && !t.length) throw new Error("Chord must be an array of pitches");
                return t.forEach((function (t) {
                    this.noteOn(n, t, 0, r)
                }), this), t.forEach((function (t, r) {
                    0 === r ? this.noteOff(n, t, e) : this.noteOff(n, t)
                }), this), this
            }, o.prototype.setInstrument = o.prototype.instrument = function (n, t, e) {
                return this.events.push(new r({
                    type: r.PROGRAM_CHANGE,
                    channel: n,
                    param1: t,
                    time: e || 0
                })), this
            }, o.prototype.setTempo = o.prototype.tempo = function (n, t) {
                return this.events.push(new i({
                    type: i.TEMPO,
                    data: e.mpqnFromBpm(n),
                    time: t || 0
                })), this
            }, o.prototype.toBytes = function () {
                var n = 0,
                    t = [],
                    r = o.START_BYTES,
                    i = o.END_BYTES;
                this.events.forEach((function (e) {
                    var r = e.toBytes();
                    n += r.length, t.push.apply(t, r)
                })), n += i.length;
                var u = e.str2Bytes(n.toString(16), 4);
                return r.concat(u, t, i)
            };
            var u = function (n) {
                if (!this) return new u(n);
                var t = n || {};
                if (t.ticks) {
                    if ("number" != typeof t.ticks) throw new Error("Ticks per beat must be a number!");
                    if (t.ticks <= 0 || t.ticks >= 32768 || t.ticks % 1 != 0) throw new Error("Ticks per beat must be an integer between 1 and 32767!")
                }
                this.ticks = t.ticks || 128, this.tracks = t.tracks || []
            };
            u.HDR_CHUNKID = "MThd", u.HDR_CHUNK_SIZE = "\0\0\0", u.HDR_TYPE0 = "\0\0", u.HDR_TYPE1 = "\0", u.prototype.addTrack = function (n) {
                return n ? (this.tracks.push(n), this) : (n = new o, this.tracks.push(n), n)
            }, u.prototype.toBytes = function () {
                var n = this.tracks.length.toString(16),
                    t = u.HDR_CHUNKID + u.HDR_CHUNK_SIZE;
                return parseInt(n, 16) > 1 ? t += u.HDR_TYPE1 : t += u.HDR_TYPE0, t += e.codes2Str(e.str2Bytes(n, 2)), t += String.fromCharCode(this.ticks / 256, this.ticks % 256), this.tracks.forEach((function (n) {
                    t += e.codes2Str(n.toBytes())
                })), t
            }, n.Util = e, n.File = u, n.Track = o, n.Event = r, n.MetaEvent = i
        }(e), null !== n ? n.exports = e : null !== t ? t = e : this.Midi = e
    }).call(this, e(14)(n))
}, function (n, t, e) {
    "use strict";
    e.r(t), e.d(t, "Array", (function () {
        return i
    })), e.d(t, "Note", (function () {
        return r
    })), e.d(t, "Interval", (function () {
        return o
    })), e.d(t, "Distance", (function () {
        return u
    })), e.d(t, "Scale", (function () {
        return c
    })), e.d(t, "Chord", (function () {
        return m
    })), e.d(t, "PcSet", (function () {
        return a
    })), e.d(t, "Dictionary", (function () {
        return s
    })), e.d(t, "transpose", (function () {
        return Ot
    })), e.d(t, "interval", (function () {
        return wt
    })), e.d(t, "note", (function () {
        return Tt
    })), e.d(t, "midi", (function () {
        return jt
    })), e.d(t, "freq", (function () {
        return Et
    })), e.d(t, "chord", (function () {
        return It
    })), e.d(t, "scale", (function () {
        return Ct
    }));
    var r = {};
    e.r(r), e.d(r, "names", (function () {
        return f
    })), e.d(r, "tokenize", (function () {
        return P
    })), e.d(r, "props", (function () {
        return y
    })), e.d(r, "name", (function () {
        return b
    })), e.d(r, "pc", (function () {
        return g
    })), e.d(r, "midi", (function () {
        return A
    })), e.d(r, "midiToFreq", (function () {
        return _
    })), e.d(r, "freq", (function () {
        return O
    })), e.d(r, "freqToMidi", (function () {
        return j
    })), e.d(r, "chroma", (function () {
        return E
    })), e.d(r, "oct", (function () {
        return I
    })), e.d(r, "stepToLetter", (function () {
        return C
    })), e.d(r, "altToAcc", (function () {
        return N
    })), e.d(r, "from", (function () {
        return S
    })), e.d(r, "build", (function () {
        return k
    })), e.d(r, "fromMidi", (function () {
        return R
    })), e.d(r, "simplify", (function () {
        return D
    })), e.d(r, "enharmonic", (function () {
        return F
    }));
    var i = {};
    e.r(i), e.d(i, "range", (function () {
        return z
    })), e.d(i, "rotate", (function () {
        return L
    })), e.d(i, "compact", (function () {
        return U
    })), e.d(i, "sort", (function () {
        return B
    })), e.d(i, "unique", (function () {
        return H
    })), e.d(i, "shuffle", (function () {
        return V
    })), e.d(i, "permutations", (function () {
        return G
    }));
    var o = {};
    e.r(o), e.d(o, "names", (function () {
        return Q
    })), e.d(o, "tokenize", (function () {
        return W
    })), e.d(o, "qToAlt", (function () {
        return nn
    })), e.d(o, "altToQ", (function () {
        return tn
    })), e.d(o, "props", (function () {
        return on
    })), e.d(o, "num", (function () {
        return un
    })), e.d(o, "name", (function () {
        return an
    })), e.d(o, "semitones", (function () {
        return sn
    })), e.d(o, "chroma", (function () {
        return cn
    })), e.d(o, "ic", (function () {
        return mn
    })), e.d(o, "build", (function () {
        return ln
    })), e.d(o, "simplify", (function () {
        return fn
    })), e.d(o, "invert", (function () {
        return dn
    })), e.d(o, "fromSemitones", (function () {
        return Pn
    }));
    var u = {};
    e.r(u), e.d(u, "transpose", (function () {
        return On
    })), e.d(u, "trFifths", (function () {
        return wn
    })), e.d(u, "fifths", (function () {
        return Tn
    })), e.d(u, "transposeBy", (function () {
        return jn
    })), e.d(u, "addIntervals", (function () {
        return In
    })), e.d(u, "add", (function () {
        return Cn
    })), e.d(u, "subtract", (function () {
        return xn
    })), e.d(u, "interval", (function () {
        return Nn
    })), e.d(u, "semitones", (function () {
        return Sn
    }));
    var a = {};
    e.r(a), e.d(a, "chroma", (function () {
        return zn
    })), e.d(a, "chromas", (function () {
        return Un
    })), e.d(a, "modes", (function () {
        return qn
    })), e.d(a, "isChroma", (function () {
        return Hn
    })), e.d(a, "intervals", (function () {
        return Gn
    })), e.d(a, "isEqual", (function () {
        return Yn
    })), e.d(a, "isSubsetOf", (function () {
        return $n
    })), e.d(a, "isSupersetOf", (function () {
        return Kn
    })), e.d(a, "includes", (function () {
        return Jn
    })), e.d(a, "filter", (function () {
        return Qn
    }));
    var s = {};
    e.r(s), e.d(s, "dictionary", (function () {
        return Wn
    })), e.d(s, "combine", (function () {
        return Xn
    })), e.d(s, "scale", (function () {
        return Zn
    })), e.d(s, "chord", (function () {
        return nt
    })), e.d(s, "pcset", (function () {
        return tt
    }));
    var c = {};
    e.r(c), e.d(c, "props", (function () {
        return rt
    })), e.d(c, "names", (function () {
        return it
    })), e.d(c, "intervals", (function () {
        return ot
    })), e.d(c, "notes", (function () {
        return ut
    })), e.d(c, "exists", (function () {
        return at
    })), e.d(c, "tokenize", (function () {
        return st
    })), e.d(c, "modeNames", (function () {
        return ct
    })), e.d(c, "chords", (function () {
        return mt
    })), e.d(c, "toScale", (function () {
        return lt
    })), e.d(c, "supersets", (function () {
        return ft
    })), e.d(c, "subsets", (function () {
        return dt
    }));
    var m = {};
    e.r(m), e.d(m, "names", (function () {
        return pt
    })), e.d(m, "props", (function () {
        return Pt
    })), e.d(m, "intervals", (function () {
        return Mt
    })), e.d(m, "notes", (function () {
        return vt
    })), e.d(m, "exists", (function () {
        return yt
    })), e.d(m, "supersets", (function () {
        return bt
    })), e.d(m, "subsets", (function () {
        return gt
    })), e.d(m, "tokenize", (function () {
        return _t
    }));
    var l = "C C# Db D D# Eb E F F# Gb G G# Ab A A# Bb B".split(" "),
        f = function (n) {
            return "string" != typeof n ? l.slice() : l.filter((function (t) {
                var e = t[1] || " ";
                return -1 !== n.indexOf(e)
            }))
        },
        d = f(" #"),
        p = f(" b"),
        h = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;

    function P(n) {
        "string" != typeof n && (n = "");
        var t = h.exec(n);
        return [t[1].toUpperCase(), t[2].replace(/x/g, "##"), t[3], t[4]]
    }
    var M = Object.freeze({
            pc: null,
            name: null,
            step: null,
            alt: null,
            oct: null,
            octStr: null,
            chroma: null,
            midi: null,
            freq: null
        }),
        v = [0, 2, 4, 5, 7, 9, 11],
        y = function (n, t) {
            return void 0 === t && (t = {}),
                function (e) {
                    return t[e] || (t[e] = n(e))
                }
        }((function (n) {
            var t = P(n);
            if ("" === t[0] || "" !== t[3]) return M;
            var e = t[0],
                r = t[1],
                i = t[2],
                o = {
                    letter: e,
                    acc: r,
                    octStr: i,
                    pc: e + r,
                    name: e + r + i,
                    step: (e.charCodeAt(0) + 3) % 7,
                    alt: "b" === r[0] ? -r.length : r.length,
                    oct: i.length ? +i : null,
                    chroma: 0,
                    midi: null,
                    freq: null
                };
            return o.chroma = (v[o.step] + o.alt + 120) % 12, o.midi = null !== o.oct ? v[o.step] + o.alt + 12 * (o.oct + 1) : null, o.freq = _(o.midi), Object.freeze(o)
        })),
        b = function (n) {
            return y(n).name
        },
        g = function (n) {
            return y(n).pc
        },
        A = function (n) {
            if ("number" != typeof n && "string" != typeof n) return null;
            var t, e = y(n).midi,
                r = e || 0 === e ? e : +n;
            return (t = r) >= 0 && t <= 127 ? r : null
        },
        _ = function (n, t) {
            return void 0 === t && (t = 440), "number" == typeof n ? Math.pow(2, (n - 69) / 12) * t : null
        },
        O = function (n) {
            return y(n).freq || _(n)
        },
        w = Math.log(2),
        T = Math.log(440),
        j = function (n) {
            var t = 12 * (Math.log(n) - T) / w + 69;
            return Math.round(100 * t) / 100
        },
        E = function (n) {
            return y(n).chroma
        },
        I = function (n) {
            return y(n).oct
        },
        C = function (n) {
            return "CDEFGAB" [n]
        },
        x = function (n, t) {
            return Array(t + 1).join(n)
        },
        N = function (n) {
            return function (n, t) {
                return "number" != typeof n ? "" : t(n)
            }(n, (function (n) {
                return n < 0 ? x("b", -n) : x("#", n)
            }))
        },
        S = function (n, t) {
            void 0 === n && (n = {}), void 0 === t && (t = null);
            var e = t ? Object.assign({}, y(t), n) : n,
                r = e.step,
                i = e.alt,
                o = e.oct;
            if ("number" != typeof r) return null;
            var u = C(r);
            if (!u) return null;
            var a = u + N(i);
            return o || 0 === o ? a + o : a
        },
        k = S;

    function R(n, t) {
        return void 0 === t && (t = !1), n = Math.round(n), (!0 === t ? d : p)[n % 12] + (Math.floor(n / 12) - 1)
    }
    var D = function (n, t) {
            void 0 === t && (t = !0);
            var e = y(n),
                r = e.alt,
                i = e.chroma,
                o = e.midi;
            if (null === i) return null;
            var u = !1 === t ? r < 0 : r > 0;
            return null === o ? g(R(i, u)) : R(o, u)
        },
        F = function (n) {
            return D(n, !1)
        };

    function z(n, t) {
        return null === n || null === t ? [] : n < t ? function (n, t) {
            for (var e = []; t--; e[t] = t + n);
            return e
        }(n, t - n + 1) : function (n, t) {
            for (var e = []; t--; e[t] = n - t);
            return e
        }(n, n - t + 1)
    }

    function L(n, t) {
        var e = t.length,
            r = (n % e + e) % e;
        return t.slice(r, e).concat(t.slice(0, r))
    }
    var U = function (n) {
            return n.filter((function (n) {
                return 0 === n || n
            }))
        },
        q = function (n) {
            var t = y(n).midi;
            return null !== t ? t : y(n + "-100").midi
        };

    function B(n) {
        return U(n.map(b)).sort((function (n, t) {
            return q(n) > q(t)
        }))
    }

    function H(n) {
        return B(n).filter((function (n, t, e) {
            return 0 === t || n !== e[t - 1]
        }))
    }
    var V = function (n, t) {
            var e, r;
            void 0 === t && (t = Math.random);
            for (var i = n.length; i;) e = t() * i-- | 0, r = n[i], n[i] = n[e], n[e] = r;
            return n
        },
        G = function (n) {
            return 0 === n.length ? [
                []
            ] : G(n.slice(1)).reduce((function (t, e) {
                return t.concat(n.map((function (t, r) {
                    var i = e.slice();
                    return i.splice(r, 0, n[0]), i
                })))
            }), [])
        },
        Y = new RegExp("^([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})|(AA|A|P|M|m|d|dd)([-+]?\\d+)$"),
        $ = [0, 2, 4, 5, 7, 9, 11],
        K = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1],
        J = "1P 2m 2M 3m 3M 4P 5P 6m 6M 7m 7M 8P".split(" "),
        Q = function (n) {
            return "string" != typeof n ? J.slice() : J.filter((function (t) {
                return -1 !== n.indexOf(t[1])
            }))
        },
        W = function (n) {
            var t = Y.exec("" + n);
            return null === t ? null : t[1] ? [t[1], t[2]] : [t[4], t[3]]
        },
        X = Object.freeze({
            name: null,
            num: null,
            q: null,
            step: null,
            alt: null,
            dir: null,
            type: null,
            simple: null,
            semitones: null,
            chroma: null,
            oct: null
        }),
        Z = function (n, t) {
            return Array(Math.abs(t) + 1).join(n)
        },
        nn = function (n, t) {
            return "M" === t && "M" === n || "P" === t && "P" === n ? 0 : "m" === t && "M" === n ? -1 : /^A+$/.test(t) ? t.length : /^d+$/.test(t) ? "P" === n ? -t.length : -t.length - 1 : null
        },
        tn = function (n, t) {
            return 0 === t ? "M" === n ? "M" : "P" : -1 === t && "M" === n ? "m" : t > 0 ? Z("A", t) : t < 0 ? Z("d", "P" === n ? t : t + 1) : null
        },
        en = function (n) {
            return (Math.abs(n) - 1) % 7
        },
        rn = {};

    function on(n) {
        return "string" != typeof n ? X : rn[n] || (rn[n] = function (n) {
            var t = W(n);
            if (null === t) return X;
            var e = {
                num: 0,
                q: "d",
                name: "",
                type: "M",
                step: 0,
                dir: -1,
                simple: 1,
                alt: 0,
                oct: 0,
                semitones: 0,
                chroma: 0,
                ic: 0
            };
            return e.num = +t[0], e.q = t[1], e.step = en(e.num), e.type = "PMMPPMM" [e.step], "M" === e.type && "P" === e.q ? X : (e.name = "" + e.num + e.q, e.dir = e.num < 0 ? -1 : 1, e.simple = 8 === e.num || -8 === e.num ? e.num : e.dir * (e.step + 1), e.alt = nn(e.type, e.q), e.oct = Math.floor((Math.abs(e.num) - 1) / 7), e.semitones = e.dir * ($[e.step] + e.alt + 12 * e.oct), e.chroma = (e.dir * ($[e.step] + e.alt) % 12 + 12) % 12, Object.freeze(e))
        }(n))
    }
    var un = function (n) {
            return on(n).num
        },
        an = function (n) {
            return on(n).name
        },
        sn = function (n) {
            return on(n).semitones
        },
        cn = function (n) {
            return on(n).chroma
        },
        mn = function (n) {
            return "string" == typeof n && (n = on(n).chroma), "number" == typeof n ? K[n % 12] : null
        },
        ln = function (n) {
            var t = void 0 === n ? {} : n,
                e = t.num,
                r = t.step,
                i = t.alt,
                o = t.oct,
                u = void 0 === o ? 1 : o,
                a = t.dir;
            if (void 0 !== r && (e = r + 1 + 7 * u), void 0 === e) return null;
            if ("number" != typeof i) return null;
            var s = "number" != typeof a ? "" : a < 0 ? "-" : "",
                c = "PMMPPMM" [en(e)];
            return s + e + tn(c, i)
        },
        fn = function (n) {
            var t = on(n);
            if (t === X) return null;
            var e = t;
            return e.simple + e.q
        },
        dn = function (n) {
            var t = on(n);
            if (t === X) return null;
            var e = t,
                r = (7 - e.step) % 7,
                i = "P" === e.type ? -e.alt : -(e.alt + 1);
            return ln({
                step: r,
                alt: i,
                oct: e.oct,
                dir: e.dir
            })
        },
        pn = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7],
        hn = "P m M m M P d P m M m M".split(" "),
        Pn = function (n) {
            var t = n < 0 ? -1 : 1,
                e = Math.abs(n),
                r = e % 12,
                i = Math.floor(e / 12);
            return t * (pn[r] + 7 * i) + hn[r]
        },
        Mn = [0, 2, 4, -1, 1, 3, 5],
        vn = Mn.map((function (n) {
            return Math.floor(7 * n / 12)
        })),
        yn = [3, 0, 4, 1, 5, 2, 6];
    var bn = function (n, t, e) {
            var r = yn[function (n) {
                    var t = (n + 1) % 7;
                    return t < 0 ? 7 + t : t
                }(n)],
                i = Math.floor((n + 1) / 7);
            return void 0 === t ? {
                step: r,
                alt: i,
                dir: e
            } : {
                step: r,
                alt: i,
                oct: t + 4 * i + vn[r],
                dir: e
            }
        },
        gn = function (n) {
            return function (n, t) {
                return void 0 === t && (t = {}),
                    function (e) {
                        return t[e] || (t[e] = n(e))
                    }
            }((function (t) {
                var e = n(t);
                return null === e.name ? null : function (n) {
                    var t = n.step,
                        e = n.alt,
                        r = n.oct,
                        i = n.dir;
                    void 0 === i && (i = 1);
                    var o = Mn[t] + 7 * e;
                    return null === r ? [i * o] : [i * o, i * (r - vn[t] - 4 * e)]
                }(e)
            }))
        },
        An = gn(y),
        _n = gn(on);

    function On(n, t) {
        if (1 === arguments.length) return function (t) {
            return On(n, t)
        };
        var e = An(n),
            r = _n(t);
        if (null === e || null === r) return null;
        var i = 1 === e.length ? [e[0] + r[0]] : [e[0] + r[0], e[1] + r[1]];
        return k(bn(i[0], i[1]))
    }

    function wn(n, t) {
        if (1 === arguments.length) return function (t) {
            return wn(n, t)
        };
        var e = An(n);
        return null === e ? null : k(bn(e[0] + t))
    }

    function Tn(n, t) {
        if (1 === arguments.length) return function (t) {
            return Tn(n, t)
        };
        var e = An(n),
            r = An(t);
        return null === r || null === e ? null : r[0] - e[0]
    }

    function jn(n, t) {
        return 1 === arguments.length ? function (t) {
            return On(t, n)
        } : On(t, n)
    }
    var En = function (n) {
        return 7 * (t = n)[0] + 12 * t[1] < 0 ? bn(-n[0], -n[1], -1) : bn(n[0], n[1], 1);
        var t
    };

    function In(n, t, e) {
        var r = _n(n),
            i = _n(t);
        if (null === r || null === i) return null;
        var o = [r[0] + e * i[0], r[1] + e * i[1]];
        return ln(En(o))
    }

    function Cn(n, t) {
        return 1 === arguments.length ? function (t) {
            return Cn(n, t)
        } : In(n, t, 1)
    }

    function xn(n, t) {
        return 1 === arguments.length ? function (t) {
            return Cn(n, t)
        } : In(n, t, -1)
    }

    function Nn(n, t) {
        if (1 === arguments.length) return function (t) {
            return Nn(n, t)
        };
        var e = An(n),
            r = An(t);
        if (null === e || null === r || e.length !== r.length) return null;
        var i = 1 === e.length ? [r[0] - e[0], -Math.floor(7 * (r[0] - e[0]) / 12)] : [r[0] - e[0], r[1] - e[1]];
        return ln(En(i))
    }

    function Sn(n, t) {
        if (1 === arguments.length) return function (t) {
            return Sn(n, t)
        };
        var e = y(n),
            r = y(t);
        return null !== e.midi && null !== r.midi ? r.midi - e.midi : null !== e.chroma && null !== r.chroma ? (r.chroma - e.chroma + 12) % 12 : null
    }
    var kn = e(6),
        Rn = e(7),
        Dn = function (n) {
            return E(n) || cn(n) || 0
        },
        Fn = function (n) {
            return parseInt(zn(n), 2)
        };

    function zn(n) {
        if (Hn(n)) return n;
        if (!Array.isArray(n)) return "";
        var t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        return n.map(Dn).forEach((function (n) {
            t[n] = 1
        })), t.join("")
    }
    var Ln = null;

    function Un(n) {
        return Ln = Ln || z(2048, 4095).map((function (n) {
            return n.toString(2)
        })), "number" == typeof n ? Ln.filter((function (t) {
            return function (n) {
                return n.replace(/0/g, "").length
            }(t) === n
        })) : Ln.slice()
    }

    function qn(n, t) {
        t = !1 !== t;
        var e = zn(n).split("");
        return U(e.map((function (n, r) {
            var i = L(r, e);
            return t && "0" === i[0] ? null : i.join("")
        })))
    }
    var Bn = /^[01]{12}$/;

    function Hn(n) {
        return Bn.test(n)
    }
    var Vn = "1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M".split(" ");

    function Gn(n) {
        return Hn(n) ? U(n.split("").map((function (n, t) {
            return "1" === n ? Vn[t] : null
        }))) : []
    }

    function Yn(n, t) {
        return 1 === arguments.length ? function (t) {
            return Yn(n, t)
        } : zn(n) === zn(t)
    }

    function $n(n, t) {
        return arguments.length > 1 ? $n(n)(t) : (n = Fn(n), function (t) {
            return (t = Fn(t)) !== n && (t & n) === t
        })
    }

    function Kn(n, t) {
        return arguments.length > 1 ? Kn(n)(t) : (n = Fn(n), function (t) {
            return (t = Fn(t)) !== n && (t | n) === t
        })
    }

    function Jn(n, t) {
        return arguments.length > 1 ? Jn(n)(t) : (n = zn(n), function (t) {
            return "1" === n[Dn(t)]
        })
    }

    function Qn(n, t) {
        return 1 === arguments.length ? function (t) {
            return Qn(n, t)
        } : t.filter(Jn(n))
    }
    var Wn = function (n) {
            var t = Object.keys(n).sort(),
                e = [],
                r = [],
                i = function (n, t, i) {
                    e[n] = t, r[i] = r[i] || [], r[i].push(n)
                };
            t.forEach((function (t) {
                var e = n[t][0].split(" "),
                    r = n[t][1],
                    o = zn(e);
                i(t, e, o), r && r.forEach((function (n) {
                    return i(n, e, o)
                }))
            }));
            var o = Object.keys(e).sort(),
                u = function (n) {
                    return e[n]
                };
            return u.names = function (n) {
                return "string" == typeof n ? (r[n] || []).slice() : (!0 === n ? o : t).slice()
            }, u
        },
        Xn = function (n, t) {
            var e = function (e) {
                return n(e) || t(e)
            };
            return e.names = function (e) {
                return n.names(e).concat(t.names(e))
            }, e
        },
        Zn = Wn(kn),
        nt = Wn(Rn),
        tt = Xn(Zn, nt),
        et = Object.freeze({
            name: null,
            intervals: [],
            names: [],
            chroma: null,
            setnum: null
        }),
        rt = function (n, t) {
            return function (e) {
                return t[e] || (t[e] = n(e))
            }
        }((function (n) {
            var t = Zn(n);
            if (!t) return et;
            var e = {
                intervals: t,
                name: n
            };
            return e.chroma = zn(t), e.setnum = parseInt(e.chroma, 2), e.names = Zn.names(e.chroma), Object.freeze(e)
        }), {}),
        it = Zn.names,
        ot = function (n) {
            var t = st(n);
            return rt(t[1]).intervals
        };

    function ut(n, t) {
        var e = st(n);
        return t = t || e[1], ot(t).map(On(e[0]))
    }

    function at(n) {
        var t = st(n);
        return void 0 !== Zn(t[1])
    }

    function st(n) {
        if ("string" != typeof n) return ["", ""];
        var t = n.indexOf(" "),
            e = b(n.substring(0, t)) || b(n) || "",
            r = "" !== e ? n.substring(e.length + 1) : n;
        return [e, r.length ? r : ""]
    }
    var ct = function (n) {
            var t = ot(n),
                e = ut(n);
            return qn(t).map((function (n, r) {
                var i = Zn.names(n)[0];
                if (i) return [e[r] || t[r], i]
            })).filter((function (n) {
                return n
            }))
        },
        mt = function (n) {
            var t = $n(ot(n));
            return nt.names().filter((function (n) {
                return t(nt(n))
            }))
        },
        lt = function (n) {
            var t = U(n.map(g));
            if (!t.length) return t;
            var e = t[0],
                r = H(t);
            return L(r.indexOf(e), r)
        },
        ft = function (n) {
            if (!ot(n).length) return [];
            var t = Kn(ot(n));
            return Zn.names().filter((function (n) {
                return t(Zn(n))
            }))
        },
        dt = function (n) {
            var t = $n(ot(n));
            return Zn.names().filter((function (n) {
                return t(Zn(n))
            }))
        },
        pt = nt.names,
        ht = Object.freeze({
            name: null,
            names: [],
            intervals: [],
            chroma: null,
            setnum: null
        }),
        Pt = function (n, t) {
            return void 0 === t && (t = {}),
                function (e) {
                    return t[e] || (t[e] = n(e))
                }
        }((function (n) {
            var t = nt(n);
            if (!t) return ht;
            var e = {
                intervals: t,
                name: n
            };
            return e.chroma = zn(t), e.setnum = parseInt(e.chroma, 2), e.names = nt.names(e.chroma), e
        })),
        Mt = function (n) {
            return Pt(_t(n)[1]).intervals
        };

    function vt(n, t) {
        if (t) return Pt(t).intervals.map(On(n));
        var e = _t(n),
            r = e[0],
            i = e[1];
        return Pt(i).intervals.map(On(r))
    }
    var yt = function (n) {
            return void 0 !== nt(_t(n)[1])
        },
        bt = function (n) {
            if (!Mt(n).length) return [];
            var t = Kn(Mt(n));
            return nt.names().filter((function (n) {
                return t(nt(n))
            }))
        },
        gt = function (n) {
            var t = $n(Mt(n));
            return nt.names().filter((function (n) {
                return t(nt(n))
            }))
        },
        At = /^(6|64|7|9|11|13)$/;

    function _t(n) {
        var t = P(n);
        return "" === t[0] ? ["", n] : "A" === t[0] && "ug" === t[3] ? ["", "aug"] : At.test(t[2]) ? [t[0] + t[1], t[2] + t[3]] : [t[0] + t[1] + t[2], t[3]]
    }
    const Ot = On,
        wt = Nn,
        Tt = y,
        jt = A,
        Et = O,
        It = nt,
        Ct = Zn
}, function (n) {
    n.exports = JSON.parse('{"chromatic":["1P 2m 2M 3m 3M 4P 4A 5P 6m 6M 7m 7M"],"lydian":["1P 2M 3M 4A 5P 6M 7M"],"major":["1P 2M 3M 4P 5P 6M 7M",["ionian"]],"mixolydian":["1P 2M 3M 4P 5P 6M 7m",["dominant"]],"dorian":["1P 2M 3m 4P 5P 6M 7m"],"aeolian":["1P 2M 3m 4P 5P 6m 7m",["minor"]],"phrygian":["1P 2m 3m 4P 5P 6m 7m"],"locrian":["1P 2m 3m 4P 5d 6m 7m"],"melodic minor":["1P 2M 3m 4P 5P 6M 7M"],"melodic minor second mode":["1P 2m 3m 4P 5P 6M 7m"],"lydian augmented":["1P 2M 3M 4A 5A 6M 7M"],"lydian dominant":["1P 2M 3M 4A 5P 6M 7m",["lydian b7"]],"melodic minor fifth mode":["1P 2M 3M 4P 5P 6m 7m",["hindu","mixolydian b6M"]],"locrian #2":["1P 2M 3m 4P 5d 6m 7m",["half-diminished"]],"altered":["1P 2m 3m 3M 5d 6m 7m",["super locrian","diminished whole tone","pomeroy"]],"harmonic minor":["1P 2M 3m 4P 5P 6m 7M"],"phrygian dominant":["1P 2m 3M 4P 5P 6m 7m",["spanish","phrygian major"]],"half-whole diminished":["1P 2m 3m 3M 4A 5P 6M 7m",["dominant diminished"]],"diminished":["1P 2M 3m 4P 5d 6m 6M 7M",["whole-half diminished"]],"major pentatonic":["1P 2M 3M 5P 6M",["pentatonic"]],"lydian pentatonic":["1P 3M 4A 5P 7M",["chinese"]],"mixolydian pentatonic":["1P 3M 4P 5P 7m",["indian"]],"locrian pentatonic":["1P 3m 4P 5d 7m",["minor seven flat five pentatonic"]],"minor pentatonic":["1P 3m 4P 5P 7m"],"minor six pentatonic":["1P 3m 4P 5P 6M"],"minor hexatonic":["1P 2M 3m 4P 5P 7M"],"flat three pentatonic":["1P 2M 3m 5P 6M",["kumoi"]],"flat six pentatonic":["1P 2M 3M 5P 6m"],"major flat two pentatonic":["1P 2m 3M 5P 6M"],"whole tone pentatonic":["1P 3M 5d 6m 7m"],"ionian pentatonic":["1P 3M 4P 5P 7M"],"lydian #5P pentatonic":["1P 3M 4A 5A 7M"],"lydian dominant pentatonic":["1P 3M 4A 5P 7m"],"minor #7M pentatonic":["1P 3m 4P 5P 7M"],"super locrian pentatonic":["1P 3m 4d 5d 7m"],"in-sen":["1P 2m 4P 5P 7m"],"iwato":["1P 2m 4P 5d 7m"],"hirajoshi":["1P 2M 3m 5P 6m"],"kumoijoshi":["1P 2m 4P 5P 6m"],"pelog":["1P 2m 3m 5P 6m"],"vietnamese 1":["1P 3m 4P 5P 6m"],"vietnamese 2":["1P 3m 4P 5P 7m"],"prometheus":["1P 2M 3M 4A 6M 7m"],"prometheus neopolitan":["1P 2m 3M 4A 6M 7m"],"ritusen":["1P 2M 4P 5P 6M"],"scriabin":["1P 2m 3M 5P 6M"],"piongio":["1P 2M 4P 5P 6M 7m"],"major blues":["1P 2M 3m 3M 5P 6M"],"minor blues":["1P 3m 4P 5d 5P 7m",["blues"]],"composite blues":["1P 2M 3m 3M 4P 5d 5P 6M 7m"],"augmented":["1P 2A 3M 5P 5A 7M"],"augmented heptatonic":["1P 2A 3M 4P 5P 5A 7M"],"dorian #4":["1P 2M 3m 4A 5P 6M 7m"],"lydian diminished":["1P 2M 3m 4A 5P 6M 7M"],"whole tone":["1P 2M 3M 4A 5A 7m"],"leading whole tone":["1P 2M 3M 4A 5A 7m 7M"],"lydian minor":["1P 2M 3M 4A 5P 6m 7m"],"locrian major":["1P 2M 3M 4P 5d 6m 7m",["arabian"]],"neopolitan":["1P 2m 3m 4P 5P 6m 7M"],"neopolitan minor":["1P 2m 3m 4P 5P 6m 7M"],"neopolitan major":["1P 2m 3m 4P 5P 6M 7M",["dorian b2"]],"neopolitan major pentatonic":["1P 3M 4P 5d 7m"],"romanian minor":["1P 2M 3m 5d 5P 6M 7m"],"double harmonic lydian":["1P 2m 3M 4A 5P 6m 7M"],"harmonic major":["1P 2M 3M 4P 5P 6m 7M"],"double harmonic major":["1P 2m 3M 4P 5P 6m 7M",["gypsy"]],"egyptian":["1P 2M 4P 5P 7m"],"hungarian minor":["1P 2M 3m 4A 5P 6m 7M"],"hungarian major":["1P 2A 3M 4A 5P 6M 7m"],"oriental":["1P 2m 3M 4P 5d 6M 7m"],"spanish heptatonic":["1P 2m 3m 3M 4P 5P 6m 7m"],"flamenco":["1P 2m 3m 3M 4A 5P 7m"],"balinese":["1P 2m 3m 4P 5P 6m 7M"],"todi raga":["1P 2m 3m 4A 5P 6m 7M"],"malkos raga":["1P 3m 4P 6m 7m"],"kafi raga":["1P 3m 3M 4P 5P 6M 7m 7M"],"purvi raga":["1P 2m 3M 4P 4A 5P 6m 7M"],"persian":["1P 2m 3M 4P 5d 6m 7M"],"bebop":["1P 2M 3M 4P 5P 6M 7m 7M"],"bebop dominant":["1P 2M 3M 4P 5P 6M 7m 7M"],"bebop minor":["1P 2M 3m 3M 4P 5P 6M 7m"],"bebop major":["1P 2M 3M 4P 5P 5A 6M 7M"],"bebop locrian":["1P 2m 3m 4P 5d 5P 6m 7m"],"minor bebop":["1P 2M 3m 4P 5P 6m 7m 7M"],"mystery #1":["1P 2m 3M 5d 6m 7m"],"enigmatic":["1P 2m 3M 5d 6m 7m 7M"],"minor six diminished":["1P 2M 3m 4P 5P 6m 6M 7M"],"ionian augmented":["1P 2M 3M 4P 5A 6M 7M"],"lydian #9":["1P 2m 3M 4A 5P 6M 7M"],"ichikosucho":["1P 2M 3M 4P 5d 5P 6M 7M"],"six tone symmetric":["1P 2m 3M 4P 5A 6M"]}')
}, function (n) {
    n.exports = JSON.parse('{"4":["1P 4P 7m 10m",["quartal"]],"5":["1P 5P"],"7":["1P 3M 5P 7m",["Dominant","Dom"]],"9":["1P 3M 5P 7m 9M",["79"]],"11":["1P 5P 7m 9M 11P"],"13":["1P 3M 5P 7m 9M 13M",["13_"]],"64":["5P 8P 10M"],"M":["1P 3M 5P",["Major",""]],"M#5":["1P 3M 5A",["augmented","maj#5","Maj#5","+","aug"]],"M#5add9":["1P 3M 5A 9M",["+add9"]],"M13":["1P 3M 5P 7M 9M 13M",["maj13","Maj13"]],"M13#11":["1P 3M 5P 7M 9M 11A 13M",["maj13#11","Maj13#11","M13+4","M13#4"]],"M6":["1P 3M 5P 13M",["6"]],"M6#11":["1P 3M 5P 6M 11A",["M6b5","6#11","6b5"]],"M69":["1P 3M 5P 6M 9M",["69"]],"M69#11":["1P 3M 5P 6M 9M 11A"],"M7#11":["1P 3M 5P 7M 11A",["maj7#11","Maj7#11","M7+4","M7#4"]],"M7#5":["1P 3M 5A 7M",["maj7#5","Maj7#5","maj9#5","M7+"]],"M7#5sus4":["1P 4P 5A 7M"],"M7#9#11":["1P 3M 5P 7M 9A 11A"],"M7add13":["1P 3M 5P 6M 7M 9M"],"M7b5":["1P 3M 5d 7M"],"M7b6":["1P 3M 6m 7M"],"M7b9":["1P 3M 5P 7M 9m"],"M7sus4":["1P 4P 5P 7M"],"M9":["1P 3M 5P 7M 9M",["maj9","Maj9"]],"M9#11":["1P 3M 5P 7M 9M 11A",["maj9#11","Maj9#11","M9+4","M9#4"]],"M9#5":["1P 3M 5A 7M 9M",["Maj9#5"]],"M9#5sus4":["1P 4P 5A 7M 9M"],"M9b5":["1P 3M 5d 7M 9M"],"M9sus4":["1P 4P 5P 7M 9M"],"Madd9":["1P 3M 5P 9M",["2","add9","add2"]],"Maj7":["1P 3M 5P 7M",["maj7","M7"]],"Mb5":["1P 3M 5d"],"Mb6":["1P 3M 13m"],"Msus2":["1P 2M 5P",["add9no3","sus2"]],"Msus4":["1P 4P 5P",["sus","sus4"]],"Maddb9":["1P 3M 5P 9m"],"11b9":["1P 5P 7m 9m 11P"],"13#11":["1P 3M 5P 7m 9M 11A 13M",["13+4","13#4"]],"13#9":["1P 3M 5P 7m 9A 13M",["13#9_"]],"13#9#11":["1P 3M 5P 7m 9A 11A 13M"],"13b5":["1P 3M 5d 6M 7m 9M"],"13b9":["1P 3M 5P 7m 9m 13M"],"13b9#11":["1P 3M 5P 7m 9m 11A 13M"],"13no5":["1P 3M 7m 9M 13M"],"13sus4":["1P 4P 5P 7m 9M 13M",["13sus"]],"69#11":["1P 3M 5P 6M 9M 11A"],"7#11":["1P 3M 5P 7m 11A",["7+4","7#4","7#11_","7#4_"]],"7#11b13":["1P 3M 5P 7m 11A 13m",["7b5b13"]],"7#5":["1P 3M 5A 7m",["+7","7aug","aug7"]],"7#5#9":["1P 3M 5A 7m 9A",["7alt","7#5#9_","7#9b13_"]],"7#5b9":["1P 3M 5A 7m 9m"],"7#5b9#11":["1P 3M 5A 7m 9m 11A"],"7#5sus4":["1P 4P 5A 7m"],"7#9":["1P 3M 5P 7m 9A",["7#9_"]],"7#9#11":["1P 3M 5P 7m 9A 11A",["7b5#9"]],"7#9#11b13":["1P 3M 5P 7m 9A 11A 13m"],"7#9b13":["1P 3M 5P 7m 9A 13m"],"7add6":["1P 3M 5P 7m 13M",["67","7add13"]],"7b13":["1P 3M 7m 13m"],"7b5":["1P 3M 5d 7m"],"7b6":["1P 3M 5P 6m 7m"],"7b9":["1P 3M 5P 7m 9m"],"7b9#11":["1P 3M 5P 7m 9m 11A",["7b5b9"]],"7b9#9":["1P 3M 5P 7m 9m 9A"],"7b9b13":["1P 3M 5P 7m 9m 13m"],"7b9b13#11":["1P 3M 5P 7m 9m 11A 13m",["7b9#11b13","7b5b9b13"]],"7no5":["1P 3M 7m"],"7sus4":["1P 4P 5P 7m",["7sus"]],"7sus4b9":["1P 4P 5P 7m 9m",["susb9","7susb9","7b9sus","7b9sus4","phryg"]],"7sus4b9b13":["1P 4P 5P 7m 9m 13m",["7b9b13sus4"]],"9#11":["1P 3M 5P 7m 9M 11A",["9+4","9#4","9#11_","9#4_"]],"9#11b13":["1P 3M 5P 7m 9M 11A 13m",["9b5b13"]],"9#5":["1P 3M 5A 7m 9M",["9+"]],"9#5#11":["1P 3M 5A 7m 9M 11A"],"9b13":["1P 3M 7m 9M 13m"],"9b5":["1P 3M 5d 7m 9M"],"9no5":["1P 3M 7m 9M"],"9sus4":["1P 4P 5P 7m 9M",["9sus"]],"m":["1P 3m 5P"],"m#5":["1P 3m 5A",["m+","mb6"]],"m11":["1P 3m 5P 7m 9M 11P",["_11"]],"m11A 5":["1P 3m 6m 7m 9M 11P"],"m11b5":["1P 3m 7m 12d 2M 4P",["h11","_11b5"]],"m13":["1P 3m 5P 7m 9M 11P 13M",["_13"]],"m6":["1P 3m 4P 5P 13M",["_6"]],"m69":["1P 3m 5P 6M 9M",["_69"]],"m7":["1P 3m 5P 7m",["minor7","_","_7"]],"m7#5":["1P 3m 6m 7m"],"m7add11":["1P 3m 5P 7m 11P",["m7add4"]],"m7b5":["1P 3m 5d 7m",["half-diminished","h7","_7b5"]],"m9":["1P 3m 5P 7m 9M",["_9"]],"m9#5":["1P 3m 6m 7m 9M"],"m9b5":["1P 3m 7m 12d 2M",["h9","-9b5"]],"mMaj7":["1P 3m 5P 7M",["mM7","_M7"]],"mMaj7b6":["1P 3m 5P 6m 7M",["mM7b6"]],"mM9":["1P 3m 5P 7M 9M",["mMaj9","-M9"]],"mM9b6":["1P 3m 5P 6m 7M 9M",["mMaj9b6"]],"mb6M7":["1P 3m 6m 7M"],"mb6b9":["1P 3m 6m 9m"],"o":["1P 3m 5d",["mb5","dim"]],"o7":["1P 3m 5d 13M",["diminished","m6b5","dim7"]],"o7M7":["1P 3m 5d 6M 7M"],"oM7":["1P 3m 5d 7M"],"sus24":["1P 2M 4P 5P",["sus4add9"]],"+add#9":["1P 3M 5A 9A"],"madd4":["1P 3m 4P 5P"],"madd9":["1P 3m 5P 9M"]}')
}, function (n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = e(2);
    t.scale = r.getScale, t.mode = r.getScale, t.scales = r.scales, t.modes = r.scales;
    var i = e(1);
    t.chord = i.getChord, t.chords = i.chords;
    var o = e(3);
    t.clip = o.clip;
    var u = e(10);
    t.getChordDegrees = u.getChordDegrees, t.getChordsByProgression = u.getChordsByProgression, t.progression = u.progression;
    var a = e(11);
    t.arp = a.arp;
    var s = e(12);
    t.midi = s.midi;
    var c = e(15);
    t.Session = c.Session;
    var m = e(17);
    t.max = m.max
}, function (n, t, e) {
    "use strict";
    var r = this && this.__spreadArrays || function () {
        for (var n = 0, t = 0, e = arguments.length; t < e; t++) n += arguments[t].length;
        var r = Array(n),
            i = 0;
        for (t = 0; t < e; t++)
            for (var o = arguments[t], u = 0, a = o.length; u < a; u++, i++) r[i] = o[u];
        return r
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(0),
        o = function (n) {
            return void 0 === n && (n = 1), Math.round(Math.random() * n)
        },
        u = function (n, t, e) {
            return "R" === n && t.randomNotes ? t.randomNotes[o(t.randomNotes.length - 1)] : t.notes[e % t.notes.length]
        },
        a = function (n, t) {
            return n.durations ? n.durations[t % n.durations.length] : n.dur || n.subdiv || "8n"
        },
        s = function (n, t, e) {
            return void 0 === e && (e = []), n.forEach((function (n) {
                "string" == typeof n && ("x" !== n && "R" !== n || e.push(t), "_" === n && e.length && (e[e.length - 1] += t)), Array.isArray(n) && s(n, t / n.length, e)
            })), e
        };
    n.exports = function (n) {
        var t, e, c;
        if (!n.pattern) throw new Error("No pattern provided!");
        if (!(n.player || n.instrument || n.sample || n.buffer || n.synth || n.sampler || n.samples)) throw new Error("No player or instrument provided!");
        n.durations || n.dur || (n.durations = s(i.expandStr(n.pattern), Tone.Ticks("4n").toSeconds()));
        var m, l = [];
        return n.effects && (l = n.effects.map((function (n) {
            return new Tone[n]
        }))), (n.sample || n.buffer) && (n.player = new Tone.Player(n.sample || n.buffer)), n.samples && (n.sampler = new Tone.Sampler(n.samples)), n.synth && (n.instrument = new Tone[n.synth]), n.player ? (n.volume && (n.player.volume.value = n.volume), (t = n.player).chain.apply(t, r(l, [Tone.Master ? Tone.Master : Tone.Destination])), new Tone.Sequence((m = n.player, function (n, t) {
            ("x" === t || "R" === t && o()) && m.start(n)
        }), i.expandStr(n.pattern), n.subdiv || "4n")) : n.sampler ? (n.volume && (n.sampler.volume.value = n.volume), (e = n.sampler).chain.apply(e, r(l, [Tone.Master ? Tone.Master : Tone.Destination])), new Tone.Sequence(function (n) {
            var t = 0;
            return function (e, r) {
                "x" !== r && "R" !== r || (n.sampler.triggerAttackRelease(u(r, n, t), a(n, t), e), t++)
            }
        }(n), i.expandStr(n.pattern), n.subdiv || "4n")) : n.instrument ? (n.volume && (n.instrument.volume.value = n.volume), (c = n.instrument).chain.apply(c, r(l, [Tone.Master ? Tone.Master : Tone.Destination])), new Tone.Sequence(n.instrument.voices ? function (n) {
            var t = 0;
            return function (e, r) {
                "x" !== r && "R" !== r || (n.instrument.triggerAttackRelease(u(r, n, t), a(n, t), e), t++)
            }
        }(n) : function (n) {
            var t = 0;
            return function (e, r) {
                "x" !== r && "R" !== r || (n.instrument.triggerAttackRelease(u(r, n, t)[0], a(n, t), e), t++)
            }
        }(n), i.expandStr(n.pattern), n.subdiv || "4n")) : void 0
    }
}, function (n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = e(2),
        i = e(0);
    t.getChordDegrees = function (n) {
        var t = {
            ionian: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
            dorian: ["i", "ii", "III", "IV", "v", "vi°", "VII"],
            phrygian: ["i", "II", "III", "iv", "v°", "VI", "vii"],
            lydian: ["I", "II", "iii", "iv°", "V", "vi", "vii"],
            mixolydian: ["I", "ii", "iii°", "IV", "v", "vi", "VII"],
            aeolian: ["i", "ii°", "III", "iv", "v", "VI", "VII"],
            locrian: ["i°", "II", "iii", "iv", "V", "VI", "vii"],
            "melodic minor": ["i", "ii", "III+", "IV", "V", "vi°", "vii°"],
            "harmonic minor": ["i", "ii°", "III+", "iv", "V", "VI", "vii°"]
        };
        return t.major = t.ionian, t.minor = t.aeolian, t[n] || []
    };
    var o = {
        i: 0,
        ii: 1,
        iii: 2,
        iv: 3,
        v: 4,
        vi: 5,
        vii: 6
    };
    t.getChordsByProgression = function (n, t) {
        var e = n.split(" ");
        e[0].match(/\d/) || (e[0] += "4", n = e.join(" "));
        var i = r.getScale(n);
        return t.replace(/\s*,+\s*/g, " ").split(" ").map((function (n, t) {
            var e = function (n) {
                    var t = n.replace(/\W/g, ""),
                        e = "M";
                    return t.toLowerCase() === t && (e = "m"), n.indexOf("°") > -1 ? e + "7b5" : n.indexOf("+") > -1 ? e + "#5" : n.indexOf("7") > -1 ? "M" === e ? "Maj7" : "m7" : e
                }(n),
                r = o[n.replace(/\W|\d/g, "").toLowerCase()],
                u = i[r],
                a = u.replace(/\D+/, "");
            return u.replace(/\d/, "") + e + "-" + a
        })).toString().replace(/,/g, " ")
    };
    var u = function (n) {
            var t = n.T,
                e = n.P,
                r = n.D;
            return function (n) {
                void 0 === n && (n = 4);
                var o = [];
                o.push(i.pickOne(t));
                var u = 1;
                for (u < n - 1 && (o.push(i.pickOne(e)), u++), u < n - 1 && i.dice() && (o.push(i.pickOne(e)), u++), u < n - 1 && (o.push(i.pickOne(r)), u++), u < n - 1 && (o.push(i.pickOne(e)), u++), u < n - 1 && (o.push(i.pickOne(r)), u++), u < n - 1 && i.dice() && (o.push(i.pickOne(e)), u++); u < n;) o.push(i.pickOne(r)), u++;
                return o
            }
        },
        a = u({
            T: ["I", "vi"],
            P: ["ii", "IV"],
            D: ["V"]
        }),
        s = u({
            T: ["i", "VI"],
            P: ["ii", "iv"],
            D: ["V"]
        });``
    t.progression = function (n, t) {
        return void 0 === t && (t = 4), "major" === n || "M" === n ? a(t) : "minor" === n || "m" === n ? s(t) : void 0
    }
}, function (n, t, e) {
    "use strict";
    var r = this && this.__spreadArrays || function () {
        for (var n = 0, t = 0, e = arguments.length; t < e; t++) n += arguments[t].length;
        var r = Array(n),
            i = 0;
        for (t = 0; t < e; t++)
            for (var o = arguments[t], u = 0, a = o.length; u < a; u++, i++) r[i] = o[u];
        return r
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = e(1);
    t.arp = function (n) {
        var t = [],
            e = {
                count: 4,
                order: "0123",
                chords: ""
            };
        if ("string" == typeof n) e.chords = n;
        else {
            if (n.order && n.order.match(/\D/g)) throw new TypeError("Invalid value for order");
            if (n.count > 8 || n.count < 2) throw new TypeError("Invalid value for count");
            n.count && !n.order && (e.order = Array.from(Array(n.count).keys()).join("")), Object.assign(e, n)
        }
        for (var o = function (n) {
                var o, u, a, s, c, m = (o = i.getChord(n), u = e.count, a = function (n) {
                        return n.replace(/\d/, "") + (+n.replace(/\D/g, "") + 1)
                    }, s = o.map(a), c = s.map(a), r(o, s, c).slice(0, u)),
                    l = e.order.split("").map((function (n) {
                        return m[n]
                    }));
                t = r(t, l)
            }, u = 0, a = e.chords.split(" "); u < a.length; u++) {
            o(a[u])
        }
        return t
    }
}, function (n, t, e) {
    "use strict";
    var r = this && this.__importDefault || function (n) {
            return n && n.__esModule ? n : {
                default: n
            }
        },
        i = this && this.__importStar || function (n) {
            if (n && n.__esModule) return n;
            var t = {};
            if (null != n)
                for (var e in n) Object.hasOwnProperty.call(n, e) && (t[e] = n[e]);
            return t.default = n, t
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = r(e(13)),
        u = i(e(4));
    t.midi = function (n, t) {
        void 0 === t && (t = "music.mid");
        var e = s(n).toBytes();
        return null === t ? e : (t.endsWith(".mid") || (t += ".mid"), "undefined" != typeof window && window.URL && window.URL.createObjectURL ? a(e, t) : (o.default.writeFileSync(t, e, "binary"), void console.log("MIDI file generated: " + t + ".")))
    };
    var a = function (n, t) {
            for (var e = new Uint8Array(n.length), r = 0; r < n.length; r++) {
                var i = n.charCodeAt(r);
                e[r] = i
            }
            var o = new Blob([e], {
                    type: "audio/midi"
                }),
                u = document.createElement("a");
            return u.href = "undefined" != typeof window && void 0 !== window.URL && void 0 !== window.URL.createObjectURL && window.URL.createObjectURL(o) || "", u.download = t, u.innerText = "Download MIDI file", u
        },
        s = function (n) {
            var t = new u.File,
                e = new u.Track;
            t.addTrack(e);
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r],
                    a = o.level || 127;
                o.note ? "string" == typeof o.note ? (e.noteOn(0, o.note, o.length, a), e.noteOff(0, o.note, o.length, a)) : e.addChord(0, o.note, o.length, a) : e.noteOff(0, "", o.length)
            }
            return t
        }
}, function (n, t) {
    n.exports = require("fs")
}, function (n, t) {
    n.exports = function (n) {
        return n.webpackPolyfill || (n.deprecate = function () {}, n.paths = [], n.children || (n.children = []), Object.defineProperty(n, "loaded", {
            enumerable: !0,
            get: function () {
                return n.l
            }
        }), Object.defineProperty(n, "id", {
            enumerable: !0,
            get: function () {
                return n.i
            }
        }), n.webpackPolyfill = 1), n
    }
}, function (n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = e(16),
        i = function () {
            function n(n) {
                n = n || [], this.sessionChannels = n.map((function (n, t) {
                    return n.idx = n.idx || t, new r.Channel(n)
                }))
            }
            return n.prototype.createChannel = function (n) {
                n.idx = n.idx || this.sessionChannels.length;
                var t = new r.Channel(n);
                return this.sessionChannels.push(t), t
            }, Object.defineProperty(n.prototype, "channels", {
                get: function () {
                    return this.sessionChannels
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.startRow = function (n) {
                this.sessionChannels.forEach((function (t) {
                    t.startClip(n)
                }))
            }, n
        }();
    t.Session = i
}, function (n, t, e) {
    "use strict";
    var r = this && this.__assign || function () {
            return (r = Object.assign || function (n) {
                for (var t, e = 1, r = arguments.length; e < r; e++)
                    for (var i in t = arguments[e]) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
                return n
            }).apply(this, arguments)
        },
        i = this && this.__rest || function (n, t) {
            var e = {};
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && t.indexOf(r) < 0 && (e[r] = n[r]);
            if (null != n && "function" == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (r = Object.getOwnPropertySymbols(n); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(n, r[i]) && (e[r[i]] = n[r[i]])
            }
            return e
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = e(3),
        u = function () {
            var n = Tone.Transport.position.split(":");
            return "0" === n[0] && "0" === n[1] ? 0 : +n[0] + 1 + ":0:0"
        },
        a = function () {
            function n(n) {
                var t = this;
                this.idx = n.idx, this.activePatternIdx = -1, this.channelClips = [], n.sample && (this.player = new Tone.Player(n.sample)), n.synth && (this.instrument = new Tone[n.synth]), n.samples && (this.sampler = new Tone.Sampler(n.samples));
                n.clips, n.samples, n.sample, n.synth;
                var e = i(n, ["clips", "samples", "sample", "synth"]);
                n.clips.forEach((function (n) {
                    t.addClip(r(r({}, n), e))
                }), this)
            }
            return Object.defineProperty(n.prototype, "clips", {
                get: function () {
                    return this.channelClips
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.startClip = function (n) {
                this.activePatternIdx > -1 && this.activePatternIdx !== n && this.stopClip(this.activePatternIdx), this.channelClips[n] && "started" !== this.channelClips[n].state && (this.activePatternIdx = n, this.channelClips[n].start(u()))
            }, n.prototype.stopClip = function (n) {
                this.channelClips[n].stop(u())
            }, n.prototype.addClip = function (n, t) {
                t = t || this.channelClips.length, n.pattern ? this.channelClips[t] = o.clip(r({
                    player: this.player,
                    instrument: this.instrument,
                    sampler: this.sampler
                }, n)) : this.channelClips[t] = null
            }, Object.defineProperty(n.prototype, "activeClipIdx", {
                get: function () {
                    return this.activePatternIdx
                },
                enumerable: !0,
                configurable: !0
            }), n
        }();
    t.Channel = a
}, function (n, t, e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = e(4);
    t.max = function (n, t) {
        void 0 === t && (t = "live_set view highlighted_clip_slot clip");
        var e = new LiveAPI(t),
            i = n.reduce((function (n, t) {
                return n + t.length
            }), 0);
        e.set("loop_end", i / 512), e.call("remove_notes", 0, 1, 258, 127), e.call("set_notes");
        var o = n.reduce((function (n, t) {
            return n + (t.note ? t.note.length : 0)
        }), 0);
        e.call("notes", o);
        var u = 0;
        n.forEach((function (n) {
            n.note ? (n.note.forEach((function (t) {
                e.call("note", r.Util.midiPitchFromNote(t), u.toFixed(2).toString(), (n.length / 512).toFixed(2).toString(), n.level || 100, 0)
            })), u += n.length / 512) : u += n.length / 512
        })), e.call("done")
    }
}]));