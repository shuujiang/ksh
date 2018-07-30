if (typeof jwplayer == "undefined") {
	jwplayer = function(a) {
		if (jwplayer.api) {
			return jwplayer.api.selectPlayer(a)
		}
	};
	jwplayer.version = "6.8.";
	jwplayer.vid = document.createElement("video");
	jwplayer.audio = document.createElement("audio");
	jwplayer.source = document.createElement("source");
	(function(g) {
		var c = document, r = window, o = navigator, s = "undefined", h = "string", f = "object", d = true, j = false;
		var q = g.utils = function() {
		};
		q.exists = function(t) {
			switch (typeof (t)) {
			case h:
				return (t.length > 0);
			case f:
				return (t !== null);
			case s:
				return j
			}
			return d
		};
		q.styleDimension = function(t) {
			return t + (t.toString().indexOf("%") > 0 ? "" : "px")
		};
		q.getAbsolutePath = function(z, y) {
			if (!q.exists(y)) {
				y = c.location.href
			}
			if (!q.exists(z)) {
				return
			}
			if (i(z)) {
				return z
			}
			var A = y.substring(0, y.indexOf("://") + 3);
			var x = y.substring(A.length, y.indexOf("/", A.length + 1));
			var u;
			if (z.indexOf("/") === 0) {
				u = z.split("/")
			} else {
				var v = y.split("?")[0];
				v = v.substring(A.length + x.length + 1, v.lastIndexOf("/"));
				u = v.split("/").concat(z.split("/"))
			}
			var t = [];
			for (var w = 0; w < u.length; w++) {
				if (!u[w] || !q.exists(u[w]) || u[w] == ".") {
					continue
				} else {
					if (u[w] == "..") {
						t.pop()
					} else {
						t.push(u[w])
					}
				}
			}
			return A + x + "/" + t.join("/")
		};
		function i(u) {
			if (!q.exists(u)) {
				return
			}
			var v = u.indexOf("://");
			var t = u.indexOf("?");
			return (v > 0 && (t < 0 || (t > v)))
		}
		q.extend = function() {
			var t = q.extend["arguments"];
			if (t.length > 1) {
				for (var u = 1; u < t.length; u++) {
					q.foreach(t[u], function(w, v) {
						try {
							if (q.exists(v)) {
								t[0][w] = v
							}
						} catch (x) {
						}
					})
				}
				return t[0]
			}
			return null
		};
		var l = window.console = window.console || {
			log : function() {
			}
		};
		q.log = function() {
			var t = Array.prototype.slice.call(arguments, 0);
			if (typeof l.log === f) {
				l.log(t)
			} else {
				l.log.apply(l, t)
			}
		};
		var k = q.userAgentMatch = function(u) {
			var t = o.userAgent.toLowerCase();
			return (t.match(u) !== null)
		};
		function m(t) {
			return function() {
				return k(t)
			}
		}
		q.isIE = q.isMSIE = m(/msie/i);
		q.isFF = m(/firefox/i);
		q.isChrome = m(/chrome/i);
		q.isIPod = m(/iP(hone|od)/i);
		q.isIPad = m(/iPad/i);
		q.isSafari602 = m(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i);
		q.isIETrident = function(t) {
			if (t) {
				t = parseFloat(t).toFixed(1);
				return k(new RegExp("msie\\s*" + t + "|trident/.+rv:\\s*" + t,
						"i"))
			}
			return k(/msie|trident/i)
		};
		q.isSafari = function() {
			return (k(/safari/i) && !k(/chrome/i) && !k(/chromium/i) && !k(/android/i))
		};
		q.isIOS = function(t) {
			if (t) {
				return k(new RegExp("iP(hone|ad|od).+\\sOS\\s" + t, "i"))
			}
			return k(/iP(hone|ad|od)/i)
		};
		q.isAndroid = function(t, v) {
			var u = v ? !k(/chrome\/[23456789]/i) : d;
			if (t) {
				return u && k(new RegExp("android.*" + t, "i"))
			}
			return u && k(/android/i)
		};
		q.isMobile = function() {
			return q.isIOS() || q.isAndroid()
		};
		q.saveCookie = function(t, u) {
			c.cookie = "jwplayer." + t + "=" + u + "; path=/"
		};
		q.getCookies = function() {
			var w = {};
			var v = c.cookie.split("; ");
			for (var u = 0; u < v.length; u++) {
				var t = v[u].split("=");
				if (t[0].indexOf("jwplayer.") === 0) {
					w[t[0].substring(9, t[0].length)] = t[1]
				}
			}
			return w
		};
		q.typeOf = function(u) {
			var t = typeof u;
			if (t === f) {
				if (!u) {
					return "null"
				}
				return (u instanceof Array) ? "array" : t
			}
			return t
		};
		q.translateEventResponse = function(v, t) {
			var x = q.extend({}, t);
			if (v == g.events.JWPLAYER_FULLSCREEN && !x.fullscreen) {
				x.fullscreen = x.message == "true" ? d : j;
				delete x.message
			} else {
				if (typeof x.data == f) {
					var w = x.data;
					delete x.data;
					x = q.extend(x, w)
				} else {
					if (typeof x.metadata == f) {
						q.deepReplaceKeyName(x.metadata, [ "__dot__",
								"__spc__", "__dsh__", "__default__" ], [ ".",
								" ", "-", "default" ])
					}
				}
			}
			var u = [ "position", "duration", "offset" ];
			q.foreach(u, function(y, z) {
				if (x[z]) {
					x[z] = Math.round(x[z] * 1000) / 1000
				}
			});
			return x
		};
		q.flashVersion = function() {
			if (q.isAndroid()) {
				return 0
			}
			var t = o.plugins, u;
			try {
				if (t !== s) {
					u = t["Shockwave Flash"];
					if (u) {
						return parseInt(u.description.replace(/\D+(\d+)\..*/,
								"$1"), 10)
					}
				}
			} catch (w) {
			}
			if (typeof r.ActiveXObject != s) {
				try {
					u = new r.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if (u) {
						return parseInt(u.GetVariable("$version").split(" ")[1]
								.split(",")[0], 10)
					}
				} catch (v) {
				}
			}
			return 0
		};
		q.getScriptPath = function(v) {
			var t = c.getElementsByTagName("script");
			for (var u = 0; u < t.length; u++) {
				var w = t[u].src;
				if (w && w.indexOf(v) >= 0) {
					return w.substr(0, w.indexOf(v))
				}
			}
			return ""
		};
		q.deepReplaceKeyName = function(w, u, t) {
			switch (g.utils.typeOf(w)) {
			case "array":
				for (var v = 0; v < w.length; v++) {
					w[v] = g.utils.deepReplaceKeyName(w[v], u, t)
				}
				break;
			case f:
				q.foreach(w, function(z, C) {
					var B, A;
					if (u instanceof Array && t instanceof Array) {
						if (u.length != t.length) {
							return
						} else {
							B = u;
							A = t
						}
					} else {
						B = [ u ];
						A = [ t ]
					}
					var x = z;
					for (var y = 0; y < B.length; y++) {
						x = x.replace(new RegExp(u[y], "g"), t[y])
					}
					w[x] = g.utils.deepReplaceKeyName(C, u, t);
					if (z != x) {
						delete w[z]
					}
				});
				break
			}
			return w
		};
		var b = q.pluginPathType = {
			ABSOLUTE : 0,
			RELATIVE : 1,
			CDN : 2
		};
		q.getPluginPathType = function(u) {
			if (typeof u != h) {
				return
			}
			u = u.split("?")[0];
			var v = u.indexOf("://");
			if (v > 0) {
				return b.ABSOLUTE
			}
			var t = u.indexOf("/");
			var w = q.extension(u);
			if (v < 0 && t < 0 && (!w || !isNaN(w))) {
				return b.CDN
			}
			return b.RELATIVE
		};
		q.getPluginName = function(t) {
			return t.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2")
		};
		q.getPluginVersion = function(t) {
			return t.replace(/[^-]*-?([^\.]*).*$/, "$1")
		};
		q.isYouTube = function(t) {
			return /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(t)
		};
		q.youTubeID = function(u) {
			try {
				return (/v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i)
						.exec(u).slice(1).join("").replace("?", "")
			} catch (t) {
				return ""
			}
		};
		q.isRtmp = function(t, u) {
			return (t.indexOf("rtmp") === 0 || u == "rtmp")
		};
		q.foreach = function(u, t) {
			var v, w;
			for (v in u) {
				if (q.typeOf(u.hasOwnProperty) == "function") {
					if (u.hasOwnProperty(v)) {
						w = u[v];
						t(v, w)
					}
				} else {
					w = u[v];
					t(v, w)
				}
			}
		};
		q.isHTTPS = function() {
			return (r.location.href.indexOf("https") === 0)
		};
		q.repo = function() {
			var t = "http://p.jwpcdn.com/"
					+ g.version.split(/\W/).splice(0, 2).join("/") + "/";
			try {
				if (q.isHTTPS()) {
					t = t.replace("http://", "https://ssl.")
				}
			} catch (u) {
			}
			return t
		};
		q.ajax = function(x, v, t, w) {
			var u;
			if (x.indexOf("#") > 0) {
				x = x.replace(/#.*$/, "")
			}
			if (n(x) && q.exists(r.XDomainRequest)) {
				u = new r.XDomainRequest();
				u.onload = p(u, x, v, t, w);
				u.ontimeout = u.onprogress = function() {
				};
				u.timeout = 5000
			} else {
				if (q.exists(r.XMLHttpRequest)) {
					u = new r.XMLHttpRequest();
					u.onreadystatechange = a(u, x, v, t, w)
				} else {
					if (t) {
						t()
					}
					return u
				}
			}
			if (u.overrideMimeType) {
				u.overrideMimeType("text/xml")
			}
			u.onerror = e(t, x, u);
			setTimeout(function() {
				try {
					u.open("GET", x, d);
					u.send()
				} catch (y) {
					if (t) {
						t(x)
					}
				}
			}, 0);
			return u
		};
		function n(t) {
			return (t && t.indexOf("://") >= 0)
					&& (t.split("/")[2] != r.location.href.split("/")[2])
		}
		function e(t, v, u) {
			return function() {
				t("Error loading file")
			}
		}
		function a(u, x, v, t, w) {
			return function() {
				if (u.readyState === 4) {
					switch (u.status) {
					case 200:
						p(u, x, v, t, w)();
						break;
					case 404:
						t("File not found")
					}
				}
			}
		}
		function p(u, x, v, t, w) {
			return function() {
				var y, B;
				if (w) {
					v(u)
				} else {
					try {
						y = u.responseXML;
						if (y) {
							B = y.firstChild;
							if (y.lastChild
									&& y.lastChild.nodeName === "parsererror") {
								if (t) {
									t("Invalid XML")
								}
								return
							}
						}
					} catch (A) {
					}
					if (y && B) {
						return v(u)
					}
					var z = q.parseXML(u.responseText);
					if (z && z.firstChild) {
						u = q.extend({}, u, {
							responseXML : z
						})
					} else {
						if (t) {
							t(u.responseText ? "Invalid XML" : x)
						}
						return
					}
					v(u)
				}
			}
		}
		q.parseXML = function(t) {
			var u;
			try {
				if (r.DOMParser) {
					u = (new r.DOMParser()).parseFromString(t, "text/xml");
					if (u.childNodes
							&& u.childNodes.length
							&& u.childNodes[0].firstChild.nodeName == "parsererror") {
						return
					}
				} else {
					u = new r.ActiveXObject("Microsoft.XMLDOM");
					u.async = "false";
					u.loadXML(t)
				}
			} catch (v) {
				return
			}
			return u
		};
		q.filterPlaylist = function(z, t) {
			var w = [], v, x, u, y;
			for (v = 0; v < z.length; v++) {
				x = q.extend({}, z[v]);
				x.sources = q.filterSources(x.sources);
				if (x.sources.length > 0) {
					for (u = 0; u < x.sources.length; u++) {
						y = x.sources[u];
						if (!y.label) {
							y.label = u.toString()
						}
					}
					w.push(x)
				}
			}
			if (t && w.length === 0) {
				for (v = 0; v < z.length; v++) {
					x = q.extend({}, z[v]);
					x.sources = q.filterSources(x.sources, d);
					if (x.sources.length > 0) {
						for (u = 0; u < x.sources.length; u++) {
							y = x.sources[u];
							if (!y.label) {
								y.label = u.toString()
							}
						}
						w.push(x)
					}
				}
			}
			return w
		};
		q.filterSources = function(u, z) {
			var y, A, t = q.extensionmap;
			if (u) {
				A = [];
				for (var w = 0; w < u.length; w++) {
					var x = u[w].type, v = u[w].file;
					if (v) {
						v = q.trim(v)
					}
					if (!x) {
						x = t.extType(q.extension(v));
						u[w].type = x
					}
					if (z) {
						if (g.embed.flashCanPlay(v, x)) {
							if (!y) {
								y = x
							}
							if (x == y) {
								A.push(q.extend({}, u[w]))
							}
						}
					} else {
						if (q.canPlayHTML5(x)) {
							if (!y) {
								y = x
							}
							if (x == y) {
								A.push(q.extend({}, u[w]))
							}
						}
					}
				}
			}
			return A
		};
		q.canPlayHTML5 = function(t) {
			if (q.isAndroid() && (t == "hls" || t == "m3u" || t == "m3u8")) {
				return j
			}
			var u = q.extensionmap.types[t];
			return (!!u && !!g.vid.canPlayType && g.vid.canPlayType(u))
		};
		q.seconds = function(v) {
			v = v.replace(",", ".");
			var t = v.split(":");
			var u = 0;
			if (v.slice(-1) == "s") {
				u = parseFloat(v)
			} else {
				if (v.slice(-1) == "m") {
					u = parseFloat(v) * 60
				} else {
					if (v.slice(-1) == "h") {
						u = parseFloat(v) * 3600
					} else {
						if (t.length > 1) {
							u = parseFloat(t[t.length - 1]);
							u += parseFloat(t[t.length - 2]) * 60;
							if (t.length == 3) {
								u += parseFloat(t[t.length - 3]) * 3600
							}
						} else {
							u = parseFloat(v)
						}
					}
				}
			}
			return u
		};
		q.serialize = function(t) {
			if (t == null) {
				return null
			} else {
				if (t.toString().toLowerCase() == "true") {
					return d
				} else {
					if (t.toString().toLowerCase() == "false") {
						return j
					} else {
						if (isNaN(Number(t)) || t.length > 5 || t.length === 0) {
							return t
						} else {
							return Number(t)
						}
					}
				}
			}
		}
	})(jwplayer);
	(function(o) {
		var e = "video/", i = "audio/", g = "image", j = "mp4", c = "webm", n = "ogg", b = "aac", k = "mp3", l = "vorbis", d = o.foreach, m = {
			mp4 : e + j,
			vorbis : i + n,
			ogg : e + n,
			webm : e + c,
			aac : i + j,
			mp3 : i + "mpeg",
			hls : "application/vnd.apple.mpegurl"
		}, h = {
			mp4 : m[j],
			f4v : m[j],
			m4v : m[j],
			mov : m[j],
			m4a : m[b],
			f4a : m[b],
			aac : m[b],
			mp3 : m[k],
			ogv : m[n],
			ogg : m[l],
			oga : m[l],
			webm : m[c],
			m3u8 : m.hls,
			hls : m.hls
		}, e = "video", f = {
			flv : e,
			f4v : e,
			mov : e,
			m4a : e,
			m4v : e,
			mp4 : e,
			aac : e,
			f4a : e,
			mp3 : "sound",
			smil : "rtmp",
			m3u8 : "hls",
			hls : "hls"
		};
		var a = o.extensionmap = {};
		d(h, function(p, q) {
			a[p] = {
				html5 : q
			}
		});
		d(f, function(p, q) {
			if (!a[p]) {
				a[p] = {}
			}
			a[p].flash = q
		});
		a.types = m;
		a.mimeType = function(q) {
			var p;
			d(m, function(r, s) {
				if (!p && s == q) {
					p = r
				}
			});
			return p
		};
		a.extType = function(p) {
			return a.mimeType(h[p])
		}
	})(jwplayer.utils);
	(function(b) {
		var a = b.loaderstatus = {
			NEW : 0,
			LOADING : 1,
			ERROR : 2,
			COMPLETE : 3
		}, c = document;
		b.scriptloader = function(e) {
			var f = a.NEW, h = jwplayer.events, d = new h.eventdispatcher();
			b.extend(this, d);
			this.load = function() {
				var k = b.scriptloader.loaders[e];
				if (k && (k.getStatus() == a.NEW || k.getStatus() == a.LOADING)) {
					k.addEventListener(h.ERROR, g);
					k.addEventListener(h.COMPLETE, i);
					return
				}
				b.scriptloader.loaders[e] = this;
				if (f == a.NEW) {
					f = a.LOADING;
					var j = c.createElement("script");
					if (j.addEventListener) {
						j.onload = i;
						j.onerror = g
					} else {
						if (j.readyState) {
							j.onreadystatechange = function() {
								if (j.readyState == "loaded"
										|| j.readyState == "complete") {
									i()
								}
							}
						}
					}
					c.getElementsByTagName("head")[0].appendChild(j);
					j.src = e
				}
			};
			function g(j) {
				f = a.ERROR;
				d.sendEvent(h.ERROR)
			}
			function i(j) {
				f = a.COMPLETE;
				d.sendEvent(h.COMPLETE)
			}
			this.getStatus = function() {
				return f
			}
		};
		b.scriptloader.loaders = {}
	})(jwplayer.utils);
	(function(a) {
		a.trim = function(b) {
			return b.replace(/^\s*/, "").replace(/\s*$/, "")
		};
		a.pad = function(d, c, b) {
			if (!b) {
				b = "0"
			}
			while (d.length < c) {
				d = b + d
			}
			return d
		};
		a.xmlAttribute = function(b, c) {
			for (var d = 0; d < b.attributes.length; d++) {
				if (b.attributes[d].name
						&& b.attributes[d].name.toLowerCase() == c
								.toLowerCase()) {
					return b.attributes[d].value.toString()
				}
			}
			return ""
		};
		a.extension = function(b) {
			if (!b || b.substr(0, 4) == "rtmp") {
				return ""
			}
			b = b.substring(b.lastIndexOf("/") + 1, b.length).split("?")[0]
					.split("#")[0];
			if (b.lastIndexOf(".") > -1) {
				return b.substr(b.lastIndexOf(".") + 1, b.length).toLowerCase()
			}
		};
		a.stringToColor = function(b) {
			b = b.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2");
			if (b.length == 3) {
				b = b.charAt(0) + b.charAt(0) + b.charAt(1) + b.charAt(1)
						+ b.charAt(2) + b.charAt(2)
			}
			return parseInt(b, 16)
		}
	})(jwplayer.utils);
	(function(b) {
		var c = "touchmove", d = "touchstart", a = "touchend", e = "touchcancel";
		b.touch = function(f) {
			var q = f, k = false, g = {}, i = null, l = false, j = b.touchEvents;
			document.addEventListener(c, h);
			document.addEventListener(a, n);
			document.addEventListener(e, h);
			f.addEventListener(d, h);
			f.addEventListener(a, h);
			function n(r) {
				if (k) {
					if (l) {
						o(j.DRAG_END, r)
					}
				}
				l = false;
				k = false;
				i = null
			}
			function h(r) {
				if (r.type == d) {
					k = true;
					i = p(j.DRAG_START, r)
				} else {
					if (r.type == c) {
						if (k) {
							if (l) {
								o(j.DRAG, r)
							} else {
								o(j.DRAG_START, r, i);
								l = true;
								o(j.DRAG, r)
							}
						}
					} else {
						if (k) {
							if (l) {
								o(j.DRAG_END, r)
							} else {
								r.cancelBubble = true;
								o(j.TAP, r)
							}
						}
						l = false;
						k = false;
						i = null
					}
				}
			}
			function o(s, t, u) {
				if (g[s]) {
					m(t);
					var r = u ? u : p(s, t);
					if (r) {
						g[s](r)
					}
				}
			}
			function p(s, u) {
				var v = null;
				if (u.touches && u.touches.length) {
					v = u.touches[0]
				} else {
					if (u.changedTouches && u.changedTouches.length) {
						v = u.changedTouches[0]
					}
				}
				if (!v) {
					return null
				}
				var t = q.getBoundingClientRect();
				var r = {
					type : s,
					target : q,
					x : ((v.pageX - window.pageXOffset) - t.left),
					y : v.pageY,
					deltaX : 0,
					deltaY : 0
				};
				if (s != j.TAP && i) {
					r.deltaX = r.x - i.x;
					r.deltaY = r.y - i.y
				}
				return r
			}
			function m(r) {
				if (r.preventManipulation) {
					r.preventManipulation()
				}
				if (r.preventDefault) {
					r.preventDefault()
				}
			}
			this.addEventListener = function(s, r) {
				g[s] = r
			};
			this.removeEventListener = function(r) {
				delete g[r]
			};
			return this
		}
	})(jwplayer.utils);
	(function(a) {
		a.touchEvents = {
			DRAG : "jwplayerDrag",
			DRAG_START : "jwplayerDragStart",
			DRAG_END : "jwplayerDragEnd",
			TAP : "jwplayerTap"
		}
	})(jwplayer.utils);
	(function(a) {
		a.events = {
			COMPLETE : "COMPLETE",
			ERROR : "ERROR",
			API_READY : "jwplayerAPIReady",
			JWPLAYER_READY : "jwplayerReady",
			JWPLAYER_FULLSCREEN : "jwplayerFullscreen",
			JWPLAYER_RESIZE : "jwplayerResize",
			JWPLAYER_ERROR : "jwplayerError",
			JWPLAYER_SETUP_ERROR : "jwplayerSetupError",
			JWPLAYER_MEDIA_BEFOREPLAY : "jwplayerMediaBeforePlay",
			JWPLAYER_MEDIA_BEFORECOMPLETE : "jwplayerMediaBeforeComplete",
			JWPLAYER_COMPONENT_SHOW : "jwplayerComponentShow",
			JWPLAYER_COMPONENT_HIDE : "jwplayerComponentHide",
			JWPLAYER_MEDIA_BUFFER : "jwplayerMediaBuffer",
			JWPLAYER_MEDIA_BUFFER_FULL : "jwplayerMediaBufferFull",
			JWPLAYER_MEDIA_ERROR : "jwplayerMediaError",
			JWPLAYER_MEDIA_LOADED : "jwplayerMediaLoaded",
			JWPLAYER_MEDIA_COMPLETE : "jwplayerMediaComplete",
			JWPLAYER_MEDIA_SEEK : "jwplayerMediaSeek",
			JWPLAYER_MEDIA_TIME : "jwplayerMediaTime",
			JWPLAYER_MEDIA_VOLUME : "jwplayerMediaVolume",
			JWPLAYER_MEDIA_META : "jwplayerMediaMeta",
			JWPLAYER_MEDIA_MUTE : "jwplayerMediaMute",
			JWPLAYER_MEDIA_LEVELS : "jwplayerMediaLevels",
			JWPLAYER_MEDIA_LEVEL_CHANGED : "jwplayerMediaLevelChanged",
			JWPLAYER_CAPTIONS_CHANGED : "jwplayerCaptionsChanged",
			JWPLAYER_CAPTIONS_LIST : "jwplayerCaptionsList",
			JWPLAYER_CAPTIONS_LOADED : "jwplayerCaptionsLoaded",
			JWPLAYER_PLAYER_STATE : "jwplayerPlayerState",
			state : {
				BUFFERING : "BUFFERING",
				IDLE : "IDLE",
				PAUSED : "PAUSED",
				PLAYING : "PLAYING"
			},
			JWPLAYER_PLAYLIST_LOADED : "jwplayerPlaylistLoaded",
			JWPLAYER_PLAYLIST_ITEM : "jwplayerPlaylistItem",
			JWPLAYER_PLAYLIST_COMPLETE : "jwplayerPlaylistComplete",
			JWPLAYER_DISPLAY_CLICK : "jwplayerViewClick",
			JWPLAYER_CONTROLS : "jwplayerViewControls",
			JWPLAYER_USER_ACTION : "jwplayerUserAction",
			JWPLAYER_INSTREAM_CLICK : "jwplayerInstreamClicked",
			JWPLAYER_INSTREAM_DESTROYED : "jwplayerInstreamDestroyed",
			JWPLAYER_AD_TIME : "jwplayerAdTime",
			JWPLAYER_AD_ERROR : "jwplayerAdError",
			JWPLAYER_AD_CLICK : "jwplayerAdClicked",
			JWPLAYER_AD_COMPLETE : "jwplayerAdComplete",
			JWPLAYER_AD_IMPRESSION : "jwplayerAdImpression",
			JWPLAYER_AD_COMPANIONS : "jwplayerAdCompanions",
			JWPLAYER_AD_SKIPPED : "jwplayerAdSkipped"
		}
	})(jwplayer);
	(function(a) {
		var b = a.events, c = a.utils;
		b.eventdispatcher = function(j, d) {
			var f = j, h = d, g, e;
			this.resetEventListeners = function() {
				g = {};
				e = []
			};
			this.resetEventListeners();
			this.addEventListener = function(k, n, m) {
				try {
					if (!c.exists(g[k])) {
						g[k] = []
					}
					if (c.typeOf(n) == "string") {
						n = (new Function("return " + n))()
					}
					g[k].push({
						listener : n,
						count : m || null
					})
				} catch (l) {
					c.log("error", l)
				}
				return false
			};
			this.removeEventListener = function(l, n) {
				if (!g[l]) {
					return
				}
				try {
					for (var k = 0; k < g[l].length; k++) {
						if (g[l][k].listener.toString() == n.toString()) {
							g[l].splice(k, 1);
							break
						}
					}
				} catch (m) {
					c.log("error", m)
				}
				return false
			};
			this.addGlobalListener = function(m, l) {
				try {
					if (c.typeOf(m) == "string") {
						m = (new Function("return " + m))()
					}
					e.push({
						listener : m,
						count : l || null
					})
				} catch (k) {
					c.log("error", k)
				}
				return false
			};
			this.removeGlobalListener = function(m) {
				if (!m) {
					return
				}
				try {
					for (var k = e.length; k--;) {
						if (e[k].listener.toString() == m.toString()) {
							e.splice(k, 1)
						}
					}
				} catch (l) {
					c.log("error", l)
				}
				return false
			};
			this.sendEvent = function(k, l) {
				if (!c.exists(l)) {
					l = {}
				}
				c.extend(l, {
					id : f,
					version : a.version,
					type : k
				});
				if (h) {
					c.log(k, l)
				}
				i(g[k], l, k);
				i(e, l, k)
			};
			function i(m, p, l) {
				if (!m) {
					return
				}
				for (var k = 0; k < m.length; k++) {
					var o = m[k];
					if (o) {
						if (o.count !== null && --o.count === 0) {
							delete m[k]
						}
						try {
							o.listener(p)
						} catch (n) {
							c.log('Error handling "' + l + '" event listener ['
									+ k + "]: " + n.toString(), o.listener, p)
						}
					}
				}
			}
		}
	})(window.jwplayer);
	(function(a) {
		var c = {}, b = {};
		a.plugins = function() {
		};
		a.plugins.loadPlugins = function(e, d) {
			b[e] = new a.plugins.pluginloader(new a.plugins.model(c), d);
			return b[e]
		};
		a.plugins.registerPlugin = function(h, g, f, e) {
			var d = a.utils.getPluginName(h);
			if (!c[d]) {
				c[d] = new a.plugins.plugin(h)
			}
			c[d].registerPlugin(h, g, f, e)
		}
	})(jwplayer);
	(function(a) {
		a.plugins.model = function(b) {
			this.addPlugin = function(c) {
				var d = a.utils.getPluginName(c);
				if (!b[d]) {
					b[d] = new a.plugins.plugin(c)
				}
				return b[d]
			};
			this.getPlugins = function() {
				return b
			}
		}
	})(jwplayer);
	(function(b) {
		var a = jwplayer.utils, c = jwplayer.events, d = "undefined";
		b.pluginmodes = {
			FLASH : 0,
			JAVASCRIPT : 1,
			HYBRID : 2
		};
		b.plugin = function(e) {
			var l = a.loaderstatus.NEW, m, k, f, n;
			var g = new c.eventdispatcher();
			a.extend(this, g);
			function h() {
				switch (a.getPluginPathType(e)) {
				case a.pluginPathType.ABSOLUTE:
					return e;
				case a.pluginPathType.RELATIVE:
					return a.getAbsolutePath(e, window.location.href)
				}
			}
			function j(o) {
				n = setTimeout(function() {
					l = a.loaderstatus.COMPLETE;
					g.sendEvent(c.COMPLETE)
				}, 1000)
			}
			function i(o) {
				l = a.loaderstatus.ERROR;
				g.sendEvent(c.ERROR)
			}
			this.load = function() {
				if (l == a.loaderstatus.NEW) {
					if (e.lastIndexOf(".swf") > 0) {
						m = e;
						l = a.loaderstatus.COMPLETE;
						g.sendEvent(c.COMPLETE);
						return
					} else {
						if (a.getPluginPathType(e) == a.pluginPathType.CDN) {
							l = a.loaderstatus.COMPLETE;
							g.sendEvent(c.COMPLETE);
							return
						}
					}
					l = a.loaderstatus.LOADING;
					var o = new a.scriptloader(h());
					o.addEventListener(c.COMPLETE, j);
					o.addEventListener(c.ERROR, i);
					o.load()
				}
			};
			this.registerPlugin = function(r, q, p, o) {
				if (n) {
					clearTimeout(n);
					n = undefined
				}
				f = q;
				if (p && o) {
					m = o;
					k = p
				} else {
					if (typeof p == "string") {
						m = p
					} else {
						if (typeof p == "function") {
							k = p
						} else {
							if (!p && !o) {
								m = r
							}
						}
					}
				}
				l = a.loaderstatus.COMPLETE;
				g.sendEvent(c.COMPLETE)
			};
			this.getStatus = function() {
				return l
			};
			this.getPluginName = function() {
				return a.getPluginName(e)
			};
			this.getFlashPath = function() {
				if (m) {
					switch (a.getPluginPathType(m)) {
					case a.pluginPathType.ABSOLUTE:
						return m;
					case a.pluginPathType.RELATIVE:
						if (e.lastIndexOf(".swf") > 0) {
							return a.getAbsolutePath(m, window.location.href)
						}
						return a.getAbsolutePath(m, h())
					}
				}
				return null
			};
			this.getJS = function() {
				return k
			};
			this.getTarget = function() {
				return f
			};
			this.getPluginmode = function() {
				if (typeof m != d && typeof k != d) {
					return b.pluginmodes.HYBRID
				} else {
					if (typeof m != d) {
						return b.pluginmodes.FLASH
					} else {
						if (typeof k != d) {
							return b.pluginmodes.JAVASCRIPT
						}
					}
				}
			};
			this.getNewInstance = function(p, o, q) {
				return new k(p, o, q)
			};
			this.getURL = function() {
				return e
			}
		}
	})(jwplayer.plugins);
	(function(b) {
		var a = b.utils, c = b.events, d = a.foreach;
		b.plugins.pluginloader = function(j, i) {
			var p = a.loaderstatus.NEW, h = false, e = false, l = false, m, n = i, f = new c.eventdispatcher();
			a.extend(this, f);
			function g() {
				if (l) {
					f.sendEvent(c.ERROR, {
						message : m
					})
				} else {
					if (!e) {
						e = true;
						p = a.loaderstatus.COMPLETE;
						f.sendEvent(c.COMPLETE)
					}
				}
			}
			function o() {
				if (!n) {
					g()
				}
				if (!e && !l) {
					var r = 0, q = j.getPlugins();
					a
							.foreach(
									n,
									function(t, x) {
										var u = a.getPluginName(t), y = q[u], w = y
												.getJS(), v = y.getTarget(), s = y
												.getStatus();
										if (s == a.loaderstatus.LOADING
												|| s == a.loaderstatus.NEW) {
											r++
										} else {
											if (w
													&& (!v || parseFloat(v) > parseFloat(b.version))) {
												l = true;
												m = "Incompatible player version";
												g()
											}
										}
									});
					if (r == 0) {
						g()
					}
				}
			}
			this.setupPlugins = function(t, r, v) {
				var s = {
					length : 0,
					plugins : {}
				}, u = {
					length : 0,
					plugins : {}
				}, q = j.getPlugins();
				d(r.plugins,
						function(z, B) {
							var A = a.getPluginName(z), C = q[A], D = C
									.getFlashPath(), E = C.getJS(), w = C
									.getURL();
							if (D) {
								s.plugins[D] = a.extend({}, B);
								s.plugins[D].pluginmode = C.getPluginmode();
								s.length++
							}
							try {
								if (E && r.plugins && r.plugins[w]) {
									var x = document.createElement("div");
									x.id = t.id + "_" + A;
									x.style.position = "absolute";
									x.style.top = 0;
									x.style.zIndex = u.length + 10;
									u.plugins[A] = C.getNewInstance(t, a
											.extend({}, r.plugins[w]), x);
									u.length++;
									t.onReady(v(u.plugins[A], x, true));
									t.onResize(v(u.plugins[A], x))
								}
							} catch (y) {
								a.log("ERROR: Failed to load " + A + ".")
							}
						});
				t.plugins = u.plugins;
				return s
			};
			this.load = function() {
				if (a.exists(i) && a.typeOf(i) != "object") {
					o();
					return
				}
				p = a.loaderstatus.LOADING;
				h = true;
				d(i, function(r, s) {
					if (a.exists(r)) {
						var t = j.addPlugin(r);
						t.addEventListener(c.COMPLETE, o);
						t.addEventListener(c.ERROR, k)
					}
				});
				var q = j.getPlugins();
				d(q, function(r, s) {
					s.load()
				});
				h = false;
				o()
			};
			var k = this.pluginFailed = function(q) {
				if (!l) {
					l = true;
					m = "File not found";
					g()
				}
			};
			this.getStatus = function() {
				return p
			}
		}
	})(jwplayer);
	(function(a) {
		jwplayer.parsers = {
			localName : function(b) {
				if (!b) {
					return ""
				} else {
					if (b.localName) {
						return b.localName
					} else {
						if (b.baseName) {
							return b.baseName
						} else {
							return ""
						}
					}
				}
			},
			textContent : function(b) {
				if (!b) {
					return ""
				} else {
					if (b.textContent) {
						return jwplayer.utils.trim(b.textContent)
					} else {
						if (b.text) {
							return jwplayer.utils.trim(b.text)
						} else {
							return ""
						}
					}
				}
			},
			getChildNode : function(c, b) {
				return c.childNodes[b]
			},
			numChildren : function(b) {
				if (b.childNodes) {
					return b.childNodes.length
				} else {
					return 0
				}
			}
		}
	})(jwplayer);
	(function(b) {
		var a = b.parsers;
		var d = a.jwparser = function() {
		};
		var c = "jwplayer";
		d.parseEntry = function(l, p) {
			var e = [], n = [], m = b.utils.xmlAttribute, f = "default", q = "label", j = "file", o = "type";
			for (var k = 0; k < l.childNodes.length; k++) {
				var h = l.childNodes[k];
				if (h.prefix == c) {
					var g = a.localName(h);
					if (g == "source") {
						delete p.sources;
						e.push({
							file : m(h, j),
							"default" : m(h, f),
							label : m(h, q),
							type : m(h, o)
						})
					} else {
						if (g == "track") {
							delete p.tracks;
							n.push({
								file : m(h, j),
								"default" : m(h, f),
								kind : m(h, "kind"),
								label : m(h, q)
							})
						} else {
							p[g] = b.utils.serialize(a.textContent(h));
							if (g == "file" && p.sources) {
								delete p.sources
							}
						}
					}
				}
				if (!p[j]) {
					p[j] = p.link
				}
			}
			if (e.length) {
				p.sources = [];
				for (k = 0; k < e.length; k++) {
					if (e[k].file.length > 0) {
						e[k][f] = (e[k][f] == "true") ? true : false;
						if (!e[k].label.length) {
							delete e[k].label
						}
						p.sources.push(e[k])
					}
				}
			}
			if (n.length) {
				p.tracks = [];
				for (k = 0; k < n.length; k++) {
					if (n[k].file.length > 0) {
						n[k][f] = (n[k][f] == "true") ? true : false;
						n[k].kind = (!n[k].kind.length) ? "captions"
								: n[k].kind;
						if (!n[k].label.length) {
							delete n[k].label
						}
						p.tracks.push(n[k])
					}
				}
			}
			return p
		}
	})(jwplayer);
	(function(e) {
		var b = jwplayer.utils, h = b.xmlAttribute, c = e.localName, a = e.textContent, d = e.numChildren;
		var g = e.mediaparser = function() {
		};
		var f = "media";
		g.parseGroup = function(m, q) {
			var k, n, p = "tracks", o = [];
			function l(i) {
				var s = {
					zh : "Chinese",
					nl : "Dutch",
					en : "English",
					fr : "French",
					de : "German",
					it : "Italian",
					ja : "Japanese",
					pt : "Portuguese",
					ru : "Russian",
					es : "Spanish"
				};
				if (s[i]) {
					return s[i]
				}
				return i
			}
			for (n = 0; n < d(m); n++) {
				k = m.childNodes[n];
				if (k.prefix == f) {
					if (!c(k)) {
						continue
					}
					switch (c(k).toLowerCase()) {
					case "content":
						if (h(k, "duration")) {
							q.duration = b.seconds(h(k, "duration"))
						}
						if (d(k) > 0) {
							q = g.parseGroup(k, q)
						}
						if (h(k, "url")) {
							if (!q.sources) {
								q.sources = []
							}
							q.sources.push({
								file : h(k, "url"),
								type : h(k, "type"),
								width : h(k, "width"),
								label : h(k, "label")
							})
						}
						break;
					case "title":
						q.title = a(k);
						break;
					case "description":
						q.description = a(k);
						break;
					case "guid":
						q.mediaid = a(k);
						break;
					case "thumbnail":
						if (!q.image) {
							q.image = h(k, "url")
						}
						break;
					case "player":
						var j = k.url;
						break;
					case "group":
						g.parseGroup(k, q);
						break;
					case "subtitle":
						var r = {};
						r.file = h(k, "url");
						r.kind = "captions";
						if (h(k, "lang").length > 0) {
							r.label = l(h(k, "lang"))
						}
						o.push(r)
					}
				}
			}
			if (!q.hasOwnProperty(p)) {
				q[p] = []
			}
			for (n = 0; n < o.length; n++) {
				q[p].push(o[n])
			}
			return q
		}
	})(jwplayer.parsers);
	(function(g) {
		var b = jwplayer.utils, a = g.textContent, e = g.getChildNode, f = g.numChildren, d = g.localName;
		g.rssparser = {};
		g.rssparser.parse = function(o) {
			var h = [];
			for (var m = 0; m < f(o); m++) {
				var n = e(o, m), k = d(n).toLowerCase();
				if (k == "channel") {
					for (var l = 0; l < f(n); l++) {
						var p = e(n, l);
						if (d(p).toLowerCase() == "item") {
							h.push(c(p))
						}
					}
				}
			}
			return h
		};
		function c(l) {
			var m = {};
			for (var j = 0; j < l.childNodes.length; j++) {
				var k = l.childNodes[j];
				var h = d(k);
				if (!h) {
					continue
				}
				switch (h.toLowerCase()) {
				case "enclosure":
					m.file = b.xmlAttribute(k, "url");
					break;
				case "title":
					m.title = a(k);
					break;
				case "guid":
					m.mediaid = a(k);
					break;
				case "pubdate":
					m.date = a(k);
					break;
				case "description":
					m.description = a(k);
					break;
				case "link":
					m.link = a(k);
					break;
				case "category":
					if (m.tags) {
						m.tags += a(k)
					} else {
						m.tags = a(k)
					}
					break
				}
			}
			m = g.mediaparser.parseGroup(l, m);
			m = g.jwparser.parseEntry(l, m);
			return new jwplayer.playlist.item(m)
		}
	})(jwplayer.parsers);
	(function(a) {
		a.playlist = function(c) {
			var d = [];
			if (a.utils.typeOf(c) == "array") {
				for (var b = 0; b < c.length; b++) {
					d.push(new a.playlist.item(c[b]))
				}
			} else {
				d.push(new a.playlist.item(c))
			}
			return d
		}
	})(jwplayer);
	(function(b) {
		var a = b.item = function(f) {
			var c = jwplayer.utils, e = c.extend({}, a.defaults, f);
			e.tracks = (f && c.exists(f.tracks)) ? f.tracks : [];
			if (e.sources.length == 0) {
				e.sources = [ new b.source(e) ]
			}
			for (var g = 0; g < e.sources.length; g++) {
				var h = e.sources[g]["default"];
				if (h) {
					e.sources[g]["default"] = (h.toString() == "true")
				} else {
					e.sources[g]["default"] = false
				}
				e.sources[g] = new b.source(e.sources[g])
			}
			if (e.captions && !c.exists(f.tracks)) {
				for (var d = 0; d < e.captions.length; d++) {
					e.tracks.push(e.captions[d])
				}
				delete e.captions
			}
			for (var g = 0; g < e.tracks.length; g++) {
				e.tracks[g] = new b.track(e.tracks[g])
			}
			return e
		};
		a.defaults = {
			description : "",
			image : "",
			mediaid : "",
			title : "",
			sources : [],
			tracks : []
		}
	})(jwplayer.playlist);
	(function(e) {
		var d = jwplayer, a = d.utils, c = d.events, b = d.parsers;
		e.loader = function() {
			var h = new c.eventdispatcher();
			a.extend(this, h);
			this.load = function(j) {
				a.ajax(j, i, g)
			};
			function i(l) {
				try {
					var n = l.responseXML.childNodes;
					var o = "";
					for (var j = 0; j < n.length; j++) {
						o = n[j];
						if (o.nodeType != 8) {
							break
						}
					}
					if (b.localName(o) == "xml") {
						o = o.nextSibling
					}
					if (b.localName(o) != "rss") {
						f("Not a valid RSS feed");
						return
					}
					var k = new e(b.rssparser.parse(o));
					h.sendEvent(c.JWPLAYER_PLAYLIST_LOADED, {
						playlist : k
					})
				} catch (m) {
					f()
				}
			}
			function g(j) {
				f(j.match(/invalid/i) ? "Not a valid RSS feed" : "")
			}
			function f(j) {
				h.sendEvent(c.JWPLAYER_ERROR, {
					message : j ? j : "Error loading file"
				})
			}
		}
	})(jwplayer.playlist);
	(function(d) {
		var b = undefined, a = jwplayer.utils, c = {
			file : b,
			label : b,
			type : b,
			"default" : b
		};
		d.source = function(f) {
			var e = a.extend({}, c);
			a.foreach(c, function(h, g) {
				if (a.exists(f[h])) {
					e[h] = f[h];
					delete f[h]
				}
			});
			if (e.type && e.type.indexOf("/") > 0) {
				e.type = a.extensionmap.mimeType(e.type)
			}
			if (e.type == "m3u8") {
				e.type = "hls"
			}
			if (e.type == "smil") {
				e.type = "rtmp"
			}
			return e
		}
	})(jwplayer.playlist);
	(function(d) {
		var b = undefined, a = jwplayer.utils, c = {
			file : b,
			label : b,
			kind : "captions",
			"default" : false
		};
		d.track = function(e) {
			var f = a.extend({}, c);
			if (!e) {
				e = {}
			}
			a.foreach(c, function(h, g) {
				if (a.exists(e[h])) {
					f[h] = e[h];
					delete e[h]
				}
			});
			return f
		}
	})(jwplayer.playlist);
	(function(c) {
		var b = c.utils, e = c.events, d = true, f = false, g = document;
		var h = c.embed = function(s) {
			var m = new h.config(s.config), n, u, A, k = m.width, B = m.height, j = "Error loading player: ", C = c.plugins
					.loadPlugins(s.id, m.plugins), q = f, y = f, t = null, v = this;
			if (m.fallbackDiv) {
				A = m.fallbackDiv;
				delete m.fallbackDiv
			}
			m.id = s.id;
			u = g.getElementById(s.id);
			if (m.aspectratio) {
				s.config.aspectratio = m.aspectratio
			} else {
				delete s.config.aspectratio
			}
			n = g.createElement("div");
			n.id = u.id;
			n.style.width = k.toString().indexOf("%") > 0 ? k : (k + "px");
			n.style.height = B.toString().indexOf("%") > 0 ? B : (B + "px");
			u.parentNode.replaceChild(n, u);
			function w(E, D) {
				b.foreach(D, function(F, G) {
					if (typeof E[F] == "function") {
						(E[F]).call(E, G)
					}
				})
			}
			v.embed = function() {
				if (y) {
					return
				}
				C.addEventListener(e.COMPLETE, p);
				C.addEventListener(e.ERROR, o);
				C.load()
			};
			function p() {
				if (y) {
					return
				}
				if (b.typeOf(m.playlist) == "array" && m.playlist.length < 2) {
					if (m.playlist.length == 0 || !m.playlist[0].sources
							|| m.playlist[0].sources.length == 0) {
						r();
						return
					}
				}
				if (q) {
					return
				}
				if (b.typeOf(m.playlist) == "string") {
					var E = new c.playlist.loader();
					E.addEventListener(e.JWPLAYER_PLAYLIST_LOADED, function(I) {
						m.playlist = I.playlist;
						q = f;
						p()
					});
					E.addEventListener(e.JWPLAYER_ERROR, function(I) {
						q = f;
						r(I)
					});
					q = d;
					E.load(m.playlist);
					return
				}
				if (C.getStatus() == b.loaderstatus.COMPLETE) {
					for (var H = 0; H < m.modes.length; H++) {
						if (m.modes[H].type && h[m.modes[H].type]) {
							var D = b.extend({}, m), F = new h[m.modes[H].type](
									n, m.modes[H], D, C, s);
							if (F.supportsConfig()) {
								F.addEventListener(e.ERROR, i);
								F.embed();
								w(s, D.events);
								return s
							}
						}
					}
					var G;
					if (m.fallback) {
						G = "No suitable players found and fallback enabled";
						t = setTimeout(function() {
							l(G, d)
						}, 10);
						b.log(G);
						new h.download(n, m, r)
					} else {
						G = "No suitable players found and fallback disabled";
						l(G, f);
						b.log(G);
						x()
					}
				}
			}
			function x() {
				n.parentNode.replaceChild(A, n)
			}
			function i(D) {
				z(j + D.message)
			}
			function o(D) {
				z("Could not load plugins: " + D.message)
			}
			function r(D) {
				if (D && D.message) {
					z("Error loading playlist: " + D.message)
				} else {
					z(j + "No playable sources found")
				}
			}
			function l(D, E) {
				if (t) {
					clearTimeout(t);
					t = null
				}
				t = setTimeout(function() {
					t = null;
					s.dispatchEvent(e.JWPLAYER_SETUP_ERROR, {
						message : D,
						fallback : E
					})
				}, 0)
			}
			function z(D) {
				if (y) {
					return
				}
				if (!m.fallback) {
					l(D, f);
					return
				}
				y = d;
				a(n, D, m);
				l(D, d)
			}
			v.errorScreen = z;
			return v
		};
		function a(i, l, j) {
			var k = i.style;
			k.backgroundColor = "#000";
			k.color = "#FFF";
			k.width = b.styleDimension(j.width);
			k.height = b.styleDimension(j.height);
			k.display = "table";
			k.opacity = 1;
			var n = document.createElement("p"), m = n.style;
			m.verticalAlign = "middle";
			m.textAlign = "center";
			m.display = "table-cell";
			m.font = "15px/20px Arial, Helvetica, sans-serif";
			n.innerHTML = l.replace(":", ":<br>");
			i.innerHTML = "";
			i.appendChild(n)
		}
		c.embed.errorScreen = a
	})(jwplayer);
	(function(e) {
		var i = e.utils, h = e.embed, j = e.playlist.item, g = undefined;
		var a = h.config = function(l) {
			var n = {
				fallback : true,
				height : 270,
				primary : "html5",
				width : 480,
				base : l.base ? l.base : i.getScriptPath("jwplayer.js"),
				aspectratio : ""
			}, m = i.extend(n, e.defaults, l), k = {
				html5 : {
					type : "html5",
					src : m.base + "jwplayer.html5.js"
				},
				flash : {
					type : "flash",
					src : m.base + "jwplayer.flash.swf"
				}
			};
			m.modes = (m.primary == "flash") ? [ k.flash, k.html5 ] : [
					k.html5, k.flash ];
			if (m.listbar) {
				m.playlistsize = m.listbar.size;
				m.playlistposition = m.listbar.position;
				m.playlistlayout = m.listbar.layout
			}
			if (m.flashplayer) {
				k.flash.src = m.flashplayer
			}
			if (m.html5player) {
				k.html5.src = m.html5player
			}
			d(m);
			f(m);
			return m
		};
		function f(l) {
			var k = l.aspectratio, m = b(k);
			if (l.width.toString().indexOf("%") == -1) {
				delete l.aspectratio
			} else {
				if (!m) {
					delete l.aspectratio
				} else {
					l.aspectratio = m
				}
			}
		}
		function b(l) {
			if (typeof l != "string" || !i.exists(l)) {
				return 0
			}
			var m = l.indexOf(":");
			if (m == -1) {
				return 0
			}
			var k = parseFloat(l.substr(0, m)), n = parseFloat(l.substr(m + 1));
			if (k <= 0 || n <= 0) {
				return 0
			}
			return (n / k * 100) + "%"
		}
		a.addConfig = function(k, l) {
			d(l);
			return i.extend(k, l)
		};
		function d(l) {
			if (!l.playlist) {
				var n = {};
				i.foreach(j.defaults, function(o, p) {
					c(l, n, o)
				});
				if (!n.sources) {
					if (l.levels) {
						n.sources = l.levels;
						delete l.levels
					} else {
						var k = {};
						c(l, k, "file");
						c(l, k, "type");
						n.sources = k.file ? [ k ] : []
					}
				}
				l.playlist = [ new j(n) ]
			} else {
				for (var m = 0; m < l.playlist.length; m++) {
					l.playlist[m] = new j(l.playlist[m])
				}
			}
		}
		function c(m, k, l) {
			if (i.exists(m[l])) {
				k[l] = m[l];
				delete m[l]
			}
		}
	})(jwplayer);
	(function(d) {
		var g = d.embed, i = d.utils, h = document, c = "none", a = "block", f = "100%", e = "relative", b = "absolute";
		g.download = function(m, x, k) {
			var p = i.extend({}, x), t, n = p.width ? p.width : 480, q = p.height ? p.height
					: 320, y, r, j = x.logo ? x.logo : {
				prefix : i.repo(),
				
				margin : 10
			};
			function w() {
				var D, E, C, F, B = p.playlist, I, A, G = [ "mp4", "aac", "mp3" ];
				if (B && B.length) {
					I = B[0];
					A = I.sources;
					for (F = 0; F < A.length; F++) {
						var z = A[F], H = z.type ? z.type : i.extensionmap
								.extType(i.extension(z.file));
						if (z.file) {
							i.foreach(G, function(J) {
								if (H == G[J]) {
									D = z.file;
									E = I.image
								} else {
									if (i.isYouTube(z.file)) {
										C = z.file
									}
								}
							});
							if (D || C) {
								continue
							}
						}
					}
				} else {
					return
				}
				if (D) {
					y = D;
					r = E;
					s();
					o()
				} else {
					if (C) {
						l(C)
					} else {
						k()
					}
				}
			}
			function s() {
				if (m) {
					t = u("a", "display", m);
					u("div", "icon", t);
					if (y) {
						t.setAttribute("href", i.getAbsolutePath(y))
					}
				}
			}
			function v(z, B) {
				var C = h.querySelectorAll(z);
				for (var A = 0; A < C.length; A++) {
					i.foreach(B, function(E, D) {
						C[A].style[E] = D
					})
				}
			}
			function o() {
				var z = "#" + m.id + " .jwdownload";
				m.style.width = "";
				m.style.height = "";
				v(z + "display", {
					width : i.styleDimension(Math.max(320, n)),
					height : i.styleDimension(Math.max(180, q)),
					background : "black center no-repeat "
							+ (r ? "url(" + r + ")" : ""),
					backgroundSize : "contain",
					position : e,
					border : c,
					display : a
				});
				v(z + "display div", {
					position : b,
					width : f,
					height : f
				});
				v(
						z + "icon",
						{
							background : "center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)"
						})
			}
			function u(z, C, B) {
				var A = h.createElement(z);
				if (C) {
					A.className = "jwdownload" + C
				}
				if (B) {
					B.appendChild(A)
				}
				return A
			}
			function l(z) {
				var A = u("iframe", "", m);
				A.src = "http://www.youtube.com/embed/" + i.youTubeID(z);
				A.width = n;
				A.height = q;
				A.style.border = "none"
			}
			w()
		}
	})(jwplayer);
	(function(c) {
		var b = c.utils, d = c.events, a = {};
		var f = c.embed.flash = function(l, m, p, k, n) {
			var h = new c.events.eventdispatcher(), i = b.flashVersion();
			b.extend(this, h);
			function q(s, r, t) {
				var u = document.createElement("param");
				u.setAttribute("name", r);
				u.setAttribute("value", t);
				s.appendChild(u)
			}
			function o(s, t, r) {
				return function(u) {
					try {
						if (r) {
							document.getElementById(n.id + "_wrapper")
									.appendChild(t)
						}
						var w = document.getElementById(n.id).getPluginConfig(
								"display");
						if (typeof s.resize == "function") {
							s.resize(w.width, w.height)
						}
						t.style.left = w.x;
						t.style.top = w.h
					} catch (v) {
					}
				}
			}
			function j(r) {
				if (!r) {
					return {}
				}
				var s = {};
				b.foreach(r, function(u, t) {
					b.foreach(t, function(w, v) {
						s[u + "." + w] = v
					})
				});
				return s
			}
			function g(r) {
				if (!r) {
					return {}
				}
				var t = {}, s = [];
				b.foreach(r, function(u, w) {
					var v = b.getPluginName(u);
					s.push(u);
					b.foreach(w, function(y, x) {
						t[v + "." + y] = x
					})
				});
				t.plugins = s.join(",");
				return t
			}
			this.embed = function() {
				p.id = n.id;
				if (i < 10) {
					h.sendEvent(d.ERROR, {
						message : "Flash version must be 10.0 or greater"
					});
					return false
				}
				var E, C, u = n.config.listbar;
				var x = b.extend({}, p);
				if (l.id + "_wrapper" == l.parentNode.id) {
					E = document.getElementById(l.id + "_wrapper")
				} else {
					E = document.createElement("div");
					C = document.createElement("div");
					C.style.display = "none";
					C.id = l.id + "_aspect";
					E.id = l.id + "_wrapper";
					E.style.position = "relative";
					E.style.display = "block";
					E.style.width = b.styleDimension(x.width);
					E.style.height = b.styleDimension(x.height);
					if (n.config.aspectratio) {
						var v = parseFloat(n.config.aspectratio);
						C.style.display = "block";
						C.style.marginTop = n.config.aspectratio;
						E.style.height = "auto";
						E.style.display = "inline-block";
						if (u) {
							if (u.position == "bottom") {
								C.style.paddingBottom = u.size + "px"
							} else {
								if (u.position == "right") {
									C.style.marginBottom = (-1 * u.size * (v / 100))
											+ "px"
								}
							}
						}
					}
					l.parentNode.replaceChild(E, l);
					E.appendChild(l);
					E.appendChild(C)
				}
				var s = k.setupPlugins(n, x, o);
				if (s.length > 0) {
					b.extend(x, g(s.plugins))
				} else {
					delete x.plugins
				}
				if (typeof x["dock.position"] != "undefined") {
					if (x["dock.position"].toString().toLowerCase() == "false") {
						x.dock = x["dock.position"];
						delete x["dock.position"]
					}
				}
				var F = "#000000", A, t = x.wmode ? x.wmode : (x.height
						&& x.height <= 40 ? "transparent" : "opaque"), w = [
						"height", "width", "modes", "events", "primary",
						"base", "fallback", "volume" ];
				for (var z = 0; z < w.length; z++) {
					delete x[w[z]]
				}
				var D = b.getCookies();
				b.foreach(D, function(G, H) {
					if (typeof (x[G]) == "undefined") {
						x[G] = H
					}
				});
				var r = window.location.href.split("/");
				r.splice(r.length - 1, 1);
				r = r.join("/");
				x.base = r + "/";
				a[l.id] = x;
				if (b.isIE()) {
					var B = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width="100%" height="100%"id="'
							+ l.id + '" name="' + l.id + '" tabindex=0"">';
					B += '<param name="movie" value="' + m.src + '">';
					B += '<param name="allowfullscreen" value="true">';
					B += '<param name="allowscriptaccess" value="always">';
					B += '<param name="seamlesstabbing" value="true">';
					B += '<param name="wmode" value="' + t + '">';
					B += '<param name="bgcolor" value="' + F + '">';
					B += "</object>";
					l.outerHTML = B;
					A = document.getElementById(l.id)
				} else {
					var y = document.createElement("object");
					y.setAttribute("type", "application/x-shockwave-flash");
					y.setAttribute("data", m.src);
					y.setAttribute("width", "100%");
					y.setAttribute("height", "100%");
					y.setAttribute("bgcolor", F);
					y.setAttribute("id", l.id);
					y.setAttribute("name", l.id);
					y.setAttribute("tabindex", 0);
					q(y, "allowfullscreen", "true");
					q(y, "allowscriptaccess", "always");
					q(y, "seamlesstabbing", "true");
					q(y, "wmode", t);
					l.parentNode.replaceChild(y, l);
					A = y
				}
				if (n.config.aspectratio) {
					A.style.position = "absolute"
				}
				n.container = A;
				n.setPlayer(A, "flash")
			};
			this.supportsConfig = function() {
				if (i) {
					if (p) {
						if (b.typeOf(p.playlist) == "string") {
							return true
						}
						try {
							var t = p.playlist[0], r = t.sources;
							if (typeof r == "undefined") {
								return true
							} else {
								for (var s = 0; s < r.length; s++) {
									if (r[s].file && e(r[s].file, r[s].type)) {
										return true
									}
								}
							}
						} catch (u) {
							return false
						}
					} else {
						return true
					}
				}
				return false
			}
		};
		f.getVars = function(g) {
			return a[g]
		};
		var e = c.embed.flashCanPlay = function(g, h) {
			if (b.isYouTube(g)) {
				return true
			}
			if (b.isRtmp(g, h)) {
				return true
			}
			if (h == "hls") {
				return true
			}
			var i = b.extensionmap[h ? h : b.extension(g)];
			if (!i) {
				return false
			}
			return !!(i.flash)
		}
	})(jwplayer);
	(function(c) {
		var a = c.utils, b = a.extensionmap, d = c.events;
		c.embed.html5 = function(g, h, o, f, k) {
			var j = this, e = new d.eventdispatcher();
			a.extend(j, e);
			function l(q, r, p) {
				return function(s) {
					try {
						var t = document.querySelector("#" + g.id + " .jwmain");
						if (p) {
							t.appendChild(r)
						}
						if (typeof q.resize == "function") {
							q.resize(t.clientWidth, t.clientHeight);
							setTimeout(function() {
								q.resize(t.clientWidth, t.clientHeight)
							}, 400)
						}
						r.left = t.style.left;
						r.top = t.style.top
					} catch (u) {
					}
				}
			}
			j.embed = function() {
				if (c.html5) {
					f.setupPlugins(k, o, l);
					g.innerHTML = "";
					var p = c.utils.extend({}, o);
					delete p.volume;
					var q = new c.html5.player(p);
					k.container = document.getElementById(k.id);
					k.setPlayer(q, "html5")
				} else {
					var r = new a.scriptloader(h.src);
					r.addEventListener(d.ERROR, i);
					r.addEventListener(d.COMPLETE, j.embed);
					r.load()
				}
			};
			function i(p) {
				j.sendEvent(p.type, {
					message : "HTML5 player not found"
				})
			}
			j.supportsConfig = function() {
				if (!!c.vid.canPlayType) {
					try {
						if (a.typeOf(o.playlist) == "string") {
							return true
						} else {
							var p = o.playlist[0].sources;
							for (var r = 0; r < p.length; r++) {
								var q = p[r].file, s = p[r].type;
								if (n(q, s)) {
									return true
								}
							}
						}
					} catch (t) {
						return false
					}
				}
				return false
			};
			function n(p, q) {
				if (navigator.userAgent.match(/BlackBerry/i) !== null) {
					return false
				}
				if (a.isAndroid()
						&& (a.extension(p) == "m3u" || a.extension(p) == "m3u8")) {
					return false
				}
				if (a.isRtmp(p, q)) {
					return false
				}
				var r = b[q ? q : a.extension(p)];
				if (!r) {
					return false
				}
				if (r.flash && !r.html5) {
					return false
				}
				return m(r.html5)
			}
			function m(p) {
				var q = c.vid;
				if (!p) {
					return true
				}
				try {
					if (q.canPlayType(p)) {
						return true
					} else {
						return false
					}
				} catch (r) {
					return false
				}
			}
		}
	})(jwplayer);
	(function(d, h) {
		var c = [], a = d.utils, e = d.events, b = e.state, g = document;
		var f = d.api = function(s) {
			var v = this, i = {}, l = {}, j, z = false, o = [], w, r = {}, n = {};
			v.container = s;
			v.id = s.id;
			v.getBuffer = function() {
				return u("jwGetBuffer")
			};
			v.getContainer = function() {
				return v.container
			};
			v.addButton = function(D, B, C, G) {
				try {
					n[G] = C;
					var F = "jwplayer('" + v.id + "').callback('" + G + "')";
					u("jwDockAddButton", D, B, F, G)
				} catch (E) {
					a.log("Could not add dock button" + E.message)
				}
			};
			v.removeButton = function(B) {
				u("jwDockRemoveButton", B)
			};
			v.callback = function(B) {
				if (n[B]) {
					n[B]()
				}
			};
			v.forceState = function(B) {
				u("jwForceState", B);
				return v
			};
			v.releaseState = function() {
				return u("jwReleaseState")
			};
			v.getDuration = function() {
				return u("jwGetDuration")
			};
			v.getFullscreen = function() {
				return u("jwGetFullscreen")
			};
			v.getHeight = function() {
				return u("jwGetHeight")
			};
			v.getLockState = function() {
				return u("jwGetLockState")
			};
			v.getMeta = function() {
				return v.getItemMeta()
			};
			v.getMute = function() {
				return u("jwGetMute")
			};
			v.getPlaylist = function() {
				var B = u("jwGetPlaylist");
				if (v.renderingMode == "flash") {
					a.deepReplaceKeyName(B, [ "__dot__", "__spc__", "__dsh__",
							"__default__" ], [ ".", " ", "-", "default" ])
				}
				return B
			};
			v.getPlaylistItem = function(B) {
				if (!a.exists(B)) {
					B = v.getPlaylistIndex()
				}
				return v.getPlaylist()[B]
			};
			v.getPlaylistIndex = function() {
				return u("jwGetPlaylistIndex")
			};
			v.getPosition = function() {
				return u("jwGetPosition")
			};
			v.getRenderingMode = function() {
				return v.renderingMode
			};
			v.getState = function() {
				return u("jwGetState")
			};
			v.getVolume = function() {
				return u("jwGetVolume")
			};
			v.getWidth = function() {
				return u("jwGetWidth")
			};
			v.setFullscreen = function(B) {
				if (!a.exists(B)) {
					u("jwSetFullscreen", !u("jwGetFullscreen"))
				} else {
					u("jwSetFullscreen", B)
				}
				return v
			};
			v.setMute = function(B) {
				if (!a.exists(B)) {
					u("jwSetMute", !u("jwGetMute"))
				} else {
					u("jwSetMute", B)
				}
				return v
			};
			v.lock = function() {
				return v
			};
			v.unlock = function() {
				return v
			};
			v.load = function(B) {
				u("jwLoad", B);
				return v
			};
			v.playlistItem = function(B) {
				u("jwPlaylistItem", parseInt(B, 10));
				return v
			};
			v.playlistPrev = function() {
				u("jwPlaylistPrev");
				return v
			};
			v.playlistNext = function() {
				u("jwPlaylistNext");
				return v
			};
			v.resize = function(D, B) {
				if (v.renderingMode !== "flash") {
					u("jwResize", D, B)
				} else {
					var E = g.getElementById(v.id + "_wrapper"), C = g
							.getElementById(v.id + "_aspect");
					if (C) {
						C.style.display = "none"
					}
					if (E) {
						E.style.display = "block";
						E.style.width = a.styleDimension(D);
						E.style.height = a.styleDimension(B)
					}
				}
				return v
			};
			v.play = function(B) {
				if (B === h) {
					B = v.getState();
					if (B == b.PLAYING || B == b.BUFFERING) {
						u("jwPause")
					} else {
						u("jwPlay")
					}
				} else {
					u("jwPlay", B)
				}
				return v
			};
			v.pause = function(B) {
				if (B === h) {
					B = v.getState();
					if (B == b.PLAYING || B == b.BUFFERING) {
						u("jwPause")
					} else {
						u("jwPlay")
					}
				} else {
					u("jwPause", B)
				}
				return v
			};
			v.stop = function() {
				u("jwStop");
				return v
			};
			v.seek = function(B) {
				u("jwSeek", B);
				return v
			};
			v.setVolume = function(B) {
				u("jwSetVolume", B);
				return v
			};
			v.createInstream = function() {
				return new f.instream(this, j)
			};
			v.setInstream = function(B) {
				w = B;
				return B
			};
			v.loadInstream = function(C, B) {
				w = v.setInstream(v.createInstream()).init(B);
				w.loadItem(C);
				return w
			};
			v.getQualityLevels = function() {
				return u("jwGetQualityLevels")
			};
			v.getCurrentQuality = function() {
				return u("jwGetCurrentQuality")
			};
			v.setCurrentQuality = function(B) {
				u("jwSetCurrentQuality", B)
			};
			v.getCaptionsList = function() {
				return u("jwGetCaptionsList")
			};
			v.getCurrentCaptions = function() {
				return u("jwGetCurrentCaptions")
			};
			v.setCurrentCaptions = function(B) {
				u("jwSetCurrentCaptions", B)
			};
			v.getControls = function() {
				return u("jwGetControls")
			};
			v.getSafeRegion = function() {
				return u("jwGetSafeRegion")
			};
			v.setControls = function(B) {
				u("jwSetControls", B)
			};
			v.destroyPlayer = function() {
				u("jwPlayerDestroy")
			};
			v.playAd = function(C) {
				var B = d(v.id).plugins;
				if (B.vast) {
					B.vast.jwPlayAd(C)
				}
			};
			v.pauseAd = function() {
				var B = d(v.id).plugins;
				if (B.vast) {
					B.vast.jwPauseAd()
				} else {
					u("jwPauseAd")
				}
			};
			var q = {
				onBufferChange : e.JWPLAYER_MEDIA_BUFFER,
				onBufferFull : e.JWPLAYER_MEDIA_BUFFER_FULL,
				onError : e.JWPLAYER_ERROR,
				onSetupError : e.JWPLAYER_SETUP_ERROR,
				onFullscreen : e.JWPLAYER_FULLSCREEN,
				onMeta : e.JWPLAYER_MEDIA_META,
				onMute : e.JWPLAYER_MEDIA_MUTE,
				onPlaylist : e.JWPLAYER_PLAYLIST_LOADED,
				onPlaylistItem : e.JWPLAYER_PLAYLIST_ITEM,
				onPlaylistComplete : e.JWPLAYER_PLAYLIST_COMPLETE,
				onReady : e.API_READY,
				onResize : e.JWPLAYER_RESIZE,
				onComplete : e.JWPLAYER_MEDIA_COMPLETE,
				onSeek : e.JWPLAYER_MEDIA_SEEK,
				onTime : e.JWPLAYER_MEDIA_TIME,
				onVolume : e.JWPLAYER_MEDIA_VOLUME,
				onBeforePlay : e.JWPLAYER_MEDIA_BEFOREPLAY,
				onBeforeComplete : e.JWPLAYER_MEDIA_BEFORECOMPLETE,
				onDisplayClick : e.JWPLAYER_DISPLAY_CLICK,
				onControls : e.JWPLAYER_CONTROLS,
				onQualityLevels : e.JWPLAYER_MEDIA_LEVELS,
				onQualityChange : e.JWPLAYER_MEDIA_LEVEL_CHANGED,
				onCaptionsList : e.JWPLAYER_CAPTIONS_LIST,
				onCaptionsChange : e.JWPLAYER_CAPTIONS_CHANGED,
				onAdError : e.JWPLAYER_AD_ERROR,
				onAdClick : e.JWPLAYER_AD_CLICK,
				onAdImpression : e.JWPLAYER_AD_IMPRESSION,
				onAdTime : e.JWPLAYER_AD_TIME,
				onAdComplete : e.JWPLAYER_AD_COMPLETE,
				onAdCompanions : e.JWPLAYER_AD_COMPANIONS,
				onAdSkipped : e.JWPLAYER_AD_SKIPPED
			};
			a.foreach(q, function(B) {
				v[B] = y(q[B], x)
			});
			var t = {
				onBuffer : b.BUFFERING,
				onPause : b.PAUSED,
				onPlay : b.PLAYING,
				onIdle : b.IDLE
			};
			a.foreach(t, function(B) {
				v[B] = y(t[B], p)
			});
			function y(B, C) {
				return function(D) {
					return C(B, D)
				}
			}
			v.remove = function() {
				if (!z) {
					throw "Cannot call remove() before player is ready"
				}
				m(this)
			};
			function m(B) {
				o = [];
				f.destroyPlayer(B.id)
			}
			v.setup = function(C) {
				if (d.embed) {
					var D = g.getElementById(v.id);
					if (D) {
						C.fallbackDiv = D
					}
					m(v);
					var E = d(v.id);
					E.config = C;
					var B = new d.embed(E);
					B.embed();
					return E
				}
				return v
			};
			v.registerPlugin = function(E, D, C, B) {
				d.plugins.registerPlugin(E, D, C, B)
			};
			v.setPlayer = function(B, C) {
				j = B;
				v.renderingMode = C
			};
			v.detachMedia = function() {
				if (v.renderingMode == "html5") {
					return u("jwDetachMedia")
				}
			};
			v.attachMedia = function(B) {
				if (v.renderingMode == "html5") {
					return u("jwAttachMedia", B)
				}
			};
			function p(B, C) {
				if (!l[B]) {
					l[B] = [];
					x(e.JWPLAYER_PLAYER_STATE, A(B))
				}
				l[B].push(C);
				return v
			}
			function A(B) {
				return function(D) {
					var C = D.newstate, G = D.oldstate;
					if (C == B) {
						var F = l[C];
						if (F) {
							for (var H = 0; H < F.length; H++) {
								var E = F[H];
								if (typeof E == "function") {
									E.call(this, {
										oldstate : G,
										newstate : C
									})
								}
							}
						}
					}
				}
			}
			function k(B, C) {
				try {
					B.jwAddEventListener(C, 'function(dat) { jwplayer("' + v.id
							+ '").dispatchEvent("' + C + '", dat); }')
				} catch (D) {
					a.log("Could not add internal listener")
				}
			}
			function x(B, C) {
				if (!i[B]) {
					i[B] = [];
					if (j && z) {
						k(j, B)
					}
				}
				i[B].push(C);
				return v
			}
			v.removeEventListener = function(D, E) {
				var C = i[D];
				if (C) {
					for (var B = C.length; B--;) {
						if (C[B] === E) {
							C.splice(B, 1)
						}
					}
				}
			};
			v.dispatchEvent = function(F) {
				var E = i[F];
				if (E) {
					E = E.slice(0);
					var C = a.translateEventResponse(F, arguments[1]);
					for (var B = 0; B < E.length; B++) {
						var D = E[B];
						if (typeof D === "function") {
							try {
								if (F === e.JWPLAYER_PLAYLIST_LOADED) {
									a.deepReplaceKeyName(C.playlist, [
											"__dot__", "__spc__", "__dsh__",
											"__default__" ], [ ".", " ", "-",
											"default" ])
								}
								D.call(this, C)
							} catch (G) {
								a
										.log("There was an error calling back an event handler")
							}
						}
					}
				}
			};
			v.dispatchInstreamEvent = function(B) {
				if (w) {
					w.dispatchEvent(B, arguments)
				}
			};
			function u() {
				if (z) {
					if (j) {
						var B = Array.prototype.slice.call(arguments, 0), C = B
								.shift();
						if (typeof j[C] === "function") {
							switch (B.length) {
							case 6:
								return j[C](B[0], B[1], B[2], B[3], B[4], B[5]);
							case 5:
								return j[C](B[0], B[1], B[2], B[3], B[4]);
							case 4:
								return j[C](B[0], B[1], B[2], B[3]);
							case 3:
								return j[C](B[0], B[1], B[2]);
							case 2:
								return j[C](B[0], B[1]);
							case 1:
								return j[C](B[0])
							}
							return j[C]()
						}
					}
					return null
				}
				o.push(arguments)
			}
			v.callInternal = u;
			v.playerReady = function(B) {
				z = true;
				if (!j) {
					v.setPlayer(g.getElementById(B.id))
				}
				v.container = g.getElementById(v.id);
				a.foreach(i, function(C) {
					k(j, C)
				});
				x(e.JWPLAYER_PLAYLIST_ITEM, function() {
					r = {}
				});
				x(e.JWPLAYER_MEDIA_META, function(C) {
					a.extend(r, C.metadata)
				});
				v.dispatchEvent(e.API_READY);
				while (o.length > 0) {
					u.apply(this, o.shift())
				}
			};
			v.getItemMeta = function() {
				return r
			};
			v.isBeforePlay = function() {
				return u("jwIsBeforePlay")
			};
			v.isBeforeComplete = function() {
				return u("jwIsBeforeComplete")
			};
			return v
		};
		f.selectPlayer = function(j) {
			var i;
			if (!a.exists(j)) {
				j = 0
			}
			if (j.nodeType) {
				i = j
			} else {
				if (typeof j == "string") {
					i = g.getElementById(j)
				}
			}
			if (i) {
				var k = f.playerById(i.id);
				if (k) {
					return k
				} else {
					return f.addPlayer(new f(i))
				}
			} else {
				if (typeof j == "number") {
					return c[j]
				}
			}
			return null
		};
		f.playerById = function(j) {
			for (var i = 0; i < c.length; i++) {
				if (c[i].id == j) {
					return c[i]
				}
			}
			return null
		};
		f.addPlayer = function(i) {
			for (var j = 0; j < c.length; j++) {
				if (c[j] == i) {
					return i
				}
			}
			c.push(i);
			return i
		};
		f.destroyPlayer = function(k) {
			var j = -1, l;
			for (var n = 0; n < c.length; n++) {
				if (c[n].id == k) {
					j = n;
					l = c[n];
					continue
				}
			}
			if (j >= 0) {
				var o = l.id, i = g.getElementById(o
						+ (l.renderingMode == "flash" ? "_wrapper" : ""));
				if (a.clearCss) {
					a.clearCss("#" + o)
				}
				if (i) {
					if (l.renderingMode == "html5") {
						l.destroyPlayer()
					}
					var m = g.createElement("div");
					m.id = o;
					i.parentNode.replaceChild(m, i)
				}
				c.splice(j, 1)
			}
			return null
		};
		d.playerReady = function(j) {
			var i = d.api.playerById(j.id);
			if (i) {
				i.playerReady(j)
			} else {
				d.api.selectPlayer(j.id).playerReady(j)
			}
		}
	})(window.jwplayer);
	(function(c) {
		var d = c.events, a = c.utils, b = d.state;
		c.api.instream = function(j, e) {
			var i, k, h = {}, o = {}, f = this;
			function m(q, p) {
				e.jwInstreamAddEventListener(p, 'function(dat) { jwplayer("'
						+ q + '").dispatchInstreamEvent("' + p + '", dat); }')
			}
			function g(p, q) {
				if (!h[p]) {
					h[p] = [];
					m(j.id, p)
				}
				h[p].push(q);
				return this
			}
			function n(p, q) {
				if (!o[p]) {
					o[p] = [];
					g(d.JWPLAYER_PLAYER_STATE, l(p))
				}
				o[p].push(q);
				return this
			}
			function l(p) {
				return function(r) {
					var q = r.newstate, u = r.oldstate;
					if (q == p) {
						var t = o[q];
						if (t) {
							for (var v = 0; v < t.length; v++) {
								var s = t[v];
								if (typeof s == "function") {
									s.call(this, {
										oldstate : u,
										newstate : q,
										type : r.type
									})
								}
							}
						}
					}
				}
			}
			f.type = "instream";
			f.init = function() {
				j.callInternal("jwInitInstream");
				return f
			};
			f.loadItem = function(q, p) {
				i = q;
				k = p || {};
				if (a.typeOf(q) == "array") {
					j.callInternal("jwLoadArrayInstream", i, k)
				} else {
					j.callInternal("jwLoadItemInstream", i, k)
				}
			};
			f.removeEvents = function() {
				h = o = {}
			};
			f.removeEventListener = function(r, s) {
				var q = h[r];
				if (q) {
					for (var p = q.length; p--;) {
						if (q[p] === s) {
							q.splice(p, 1)
						}
					}
				}
			};
			f.dispatchEvent = function(u, t) {
				var s = h[u];
				if (s) {
					s = s.slice(0);
					var q = a.translateEventResponse(u, t[1]);
					for (var p = 0; p < s.length; p++) {
						var r = s[p];
						if (typeof r == "function") {
							r.call(this, q)
						}
					}
				}
			};
			f.onError = function(p) {
				return g(d.JWPLAYER_ERROR, p)
			};
			f.onMediaError = function(p) {
				return g(d.JWPLAYER_MEDIA_ERROR, p)
			};
			f.onFullscreen = function(p) {
				return g(d.JWPLAYER_FULLSCREEN, p)
			};
			f.onMeta = function(p) {
				return g(d.JWPLAYER_MEDIA_META, p)
			};
			f.onMute = function(p) {
				return g(d.JWPLAYER_MEDIA_MUTE, p)
			};
			f.onComplete = function(p) {
				return g(d.JWPLAYER_MEDIA_COMPLETE, p)
			};
			f.onPlaylistComplete = function(p) {
				return g(d.JWPLAYER_PLAYLIST_COMPLETE, p)
			};
			f.onPlaylistItem = function(p) {
				return g(d.JWPLAYER_PLAYLIST_ITEM, p)
			};
			f.onTime = function(p) {
				return g(d.JWPLAYER_MEDIA_TIME, p)
			};
			f.onBuffer = function(p) {
				return n(b.BUFFERING, p)
			};
			f.onPause = function(p) {
				return n(b.PAUSED, p)
			};
			f.onPlay = function(p) {
				return n(b.PLAYING, p)
			};
			f.onIdle = function(p) {
				return n(b.IDLE, p)
			};
			f.onClick = function(p) {
				return g(d.JWPLAYER_INSTREAM_CLICK, p)
			};
			f.onInstreamDestroyed = function(p) {
				return g(d.JWPLAYER_INSTREAM_DESTROYED, p)
			};
			f.onAdSkipped = function(p) {
				return g(d.JWPLAYER_AD_SKIPPED, p)
			};
			f.play = function(p) {
				e.jwInstreamPlay(p)
			};
			f.pause = function(p) {
				e.jwInstreamPause(p)
			};
			f.hide = function() {
				j.callInternal("jwInstreamHide")
			};
			f.destroy = function() {
				f.removeEvents();
				j.callInternal("jwInstreamDestroy")
			};
			f.setText = function(p) {
				e.jwInstreamSetText(p ? p : "")
			};
			f.getState = function() {
				return e.jwInstreamState()
			};
			f.setClick = function(p) {
				if (e.jwInstreamClick) {
					e.jwInstreamClick(p)
				}
			}
		}
	})(window.jwplayer)
};