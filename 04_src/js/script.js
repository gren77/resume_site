// variant switcher
(function () {
    var active = 'lawfirm';

    function show() {
        var all = document.querySelectorAll('[data-variant]');
        for (var i = 0; i < all.length; i++) {
            var el = all[i];
            var variants = el.getAttribute('data-variant').split(',');
            var match = false;
            for (var j = 0; j < variants.length; j++) {
                if (variants[j].trim() === active) {
                    match = true;
                    break;
                }
            }
            el.className = match ? 'visible' : '';
        }
    }

    function updateNav() {
        var btns = document.querySelectorAll('.variant-btn');
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            if (btn.getAttribute('data-variant-target') === active) {
                btn.className = 'variant-btn active';
            } else {
                btn.className = 'variant-btn';
            }
        }
    }

    function init() {
        show();
        updateNav();
        var btns = document.querySelectorAll('.variant-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].onclick = function () {
                active = this.getAttribute('data-variant-target');
                show();
                updateNav();
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
