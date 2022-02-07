export const landscapeMobileUserConfig = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
  },
  audio: false,
}

export const portraitMobileUserConfig = {
  video: {
    width: { min: 270, max: 270 },
    height: { min: 480, max: 480},
  },
  audio: false,
}

export const facingModeUserLandscapeConfig = {
  video: {
    facingMode: { ideal: 'user' }
  },
  audio: false,
}

export const facingModeUserPortraitConfig = {
  video: {
    facingMode: { ideal: 'user' },
    height: { 
      min: 480, 
      ideal:720,
      max: 768 
    },
    width: { 
      min: 640, 
      ideal: 960,
      max: 1024
    },
  },
  audio: false,
}

export const facingModeEnvironmentPortraitConfig = {
  video: {
    facingMode: { ideal: 'environment' },
    height: { 
      min: 480, 
      ideal:720,
      max: 768 
    },
    width: { 
      min: 640, 
      ideal: 960,
      max: 1024
    },
  },
  audio: false,
}
export const facingModeEnvironmentLandscapeConfig = {
  video: {
    facingMode: { ideal: 'environment' },
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
  },
  audio: false,
}