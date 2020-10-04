function queen(a, cur) {
    if (cur == a.length) { console.log(a); return; }
    for (var i = 0; i < a.length; i++) {
        a[cur] = i;
        var flag = true;
        for (var j = 0; j < cur; j++) {
            var ab = i - a[j];
            if (a[j] == i || (ab > 0 ? ab : -ab) == cur - j) { flag = false; break };
        };
        if (flag) { queen(a, cur + 1); }
    };
    // console.log(a.length);
};

queen([1, 1, 1, 1, 1, 1, 1, 1], 0);