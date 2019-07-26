var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades['H5P.Accordion'] = (function () {
  return {
    1: {
      /**
       * Asynchronous content upgrade hook.
       *
       * Move previous single content to content group
       *
       * @param {object} parameters
       * @param {function} finished
       * @param {object} extras
       */
      1: function (parameters, finished, extras) {
        // Move single content to new contents group
        if (parameters.panels) {
          parameters.panels.forEach( function (panel) {
            panel.contents = [];
            if (panel.content) {
              panel.contents.push(panel.content);
              delete panel.content;
            }
          });
        }

        finished(null, parameters, extras);
      }
    }
  };
})();
