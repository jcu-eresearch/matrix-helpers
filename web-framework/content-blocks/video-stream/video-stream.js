;(function($) {
  // Streaming Video support

  // Given on and off times, return true if we should be
  // "on" at time "now". Times are represented as strings
  // of the form hh:mm, e.g. "10:30" is half past ten, and
  // "23:50" is just before midnight.
  // This is slightly complicated by situations like
  // now 04:00, off 07:00, on 23:00.
  function inTimeBounds(on, off, now) {
    if (on === off)  { return true }
    if (now < on && on < off)  { return false }
    if (on <= now && now < off) { return true  }
    if (on < off && off <= now) { return false }
    if (now < off && off < on) { return true  }
    if (off <= now && now < on) { return false }
    return true
  }

  // Get a string of the format hh:mm representing the
  // current time in UTC timezone.  e.g. "13:45" is
  // quarter to two in the afternoon, UTC (which is nearly
  // midnight in Townsville)
  function getUtcTimeOfDay(time) {
    var now = time ? new Date(time) : new Date()
    var hrs = '' + now.getUTCHours()
    var mins = '' + now.getUTCMinutes()
    if (hrs.length == 1)  { hrs = '0' + hrs }
    if (mins.length == 1) { mins = '0' + mins }
    return hrs + ":" + mins
  }

  var now = getUtcTimeOfDay()
  var scheduledContentBlocks = $('[data-schedule-on][data-schedule-off]')
  scheduledContentBlocks.each(function(index, contentBlock) {
    var block = $(contentBlock)
    if (!inTimeBounds(block.data("schedule-on"), block.data("schedule-off"), now)) {
      block.hide()
    }
  })

  // This does the following to video streams:
  //
  // - searches for .video-stream-player divs
  // - reads data- attributes of each div
  // - invokes the Clappr video player on each div, using the `data-vsp_` attrs as settings
  //
  // This would have worked fine without the vsp_ bit, except that
  // the Clappr player has some style rules for an internal element
  // that is specified with [data-watermark]. That rule accidentally
  // targets our parent div, so we have to add a prefix.
  //
  // Note that data attr names get auto-magically re-written to
  // remove dashes and capitalise the letter following the dash.
  $(".video-stream-player:visible").each(function(index, contentBlock) {
    var config = { parent: contentBlock }
    $.each($(contentBlock).data(), function(name, value) {
      if (name.indexOf("vsp_") === 0) {
        name = name.slice(4)
      }
      if (value === "true" || value === "false") {
        value = !!(value === "true")
      }
      config[name] = value
    })
    new Clappr.Player(config)
  })
})(jQuery)
