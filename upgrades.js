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
        // Move single content to Column
        if (parameters.panels) {
          for (i = 0; i < parameters.panels.length; i++) {
            // Create Column parameters with previous text as sole content
            parameters.panels[i] = {
              library: "H5P.Column 1.11",
              // We avoid using H5P.createUUID since this is an upgrade script and H5P function may change
              subContentId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
                const random = Math.random() * 16 | 0, newChar = char === 'x' ? random : (random & 0x3 | 0x8);
                return newChar.toString(16);
              }),
              metadata: {
                contentType: "Column",
                license: "U",
                title: parameters.panels[i].title
              },
              params: {
                useSeparators: true,
                content: [
                  {
                    useSeparator: "auto",
                    content: parameters.panels[i].content
                  }
                ]
              }
            }
          }
        }

        finished(null, parameters, extras);
      }
    }
  };
})();
