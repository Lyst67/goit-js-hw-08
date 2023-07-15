import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function (currentTime) {
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(currentTime.seconds)
    );
  }, 1000)
);

const savedCurrentTime = localStorage.getItem('videoplayer-current-time');
const parsedCurrentTime = JSON.parse(savedCurrentTime);

player
  .setCurrentTime(parsedCurrentTime)
  .then(function () {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        alert('the time was less than 0 or greater than the video’s duration');
        break;

      default:
        alert('some other error occurred');
        break;
    }
  });
