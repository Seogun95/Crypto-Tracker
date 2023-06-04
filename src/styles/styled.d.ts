// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    blue: {
      brandColor1: string;
      brandColor2: string;
      brandColor3: string;
      brandColor4: string;
      brandColor5: string;
      brandColor6: string;
      brandColor7: string;
    };
    pointColor: string;
    subColor: string;
    accentColor: string;
    transparentBackground: string;
    bgColor: string;
    color: string;
    transparentColor: string;
    transitionOption: string;
    pointColorLight: string;
    boxShadow: string;
  }
}
