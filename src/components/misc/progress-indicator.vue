<template>
    <div></div>
  </template>
  
  <script>
  import nprogress from 'nprogress'
  
  export default {
    watch: {
      '$tampan.loadingCount'(loadingCount, oldLoadingCount) {
        if (loadingCount === 0) {
          nprogress.done(true)
        } else if (loadingCount > 0) {
          if (oldLoadingCount === 0) {
            nprogress.start()
          } else if (oldLoadingCount > loadingCount) {
            nprogress.inc()
          }
        }
      }
    }
  }
  </script>
  
  <style>
  /* Make clicks pass-through */
  
  #nprogress {
    pointer-events: none;
  }
  
  #nprogress .bar {
    background: #E8F5E9;
  
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
  
    width: 100%;
    height: 2px;
  }
  
  
  /* Fancy blur effect */
  
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #E8F5E9, 0 0 5px #E8F5E9;
    opacity: 1.0;
  
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
  
  
  /* Remove these to get rid of the spinner */
  
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }
  
  #nprogress .spinner-icon {
    width: 24px;
    height: 24px;
    box-sizing: border-box;
  
    border: solid 2px transparent;
    border-top-color: #E8F5E9;
    border-left-color: #E8F5E9;
    border-radius: 50%;
  
    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }
  
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
  
  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  