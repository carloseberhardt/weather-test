function initFingerprintJS() {
    FingerprintJS.load({token: 'i0i9MJbV29LlTyjCKwU9'})
      .then(fp => fp.get())
      .then(result => console.log(result.visitorId))
      }