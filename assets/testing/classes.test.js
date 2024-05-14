/**
 * @jest-environment jsdom
 */

import { ConvertColor } from "../js/classes.js"

describe('ConvertColor class testing', () => {

  const clrHEX = new ConvertColor('#ff0000', -20);
  const clrRGB = new ConvertColor('rgb(255,0,0)', -20);
  const clrHSL = new ConvertColor('hsl(0, 100%, 50%)', -20);
  const clr50 = new ConvertColor('#003499', -30);


  jest.spyOn(clrHEX, 'shadeColor');
  jest.spyOn(clrRGB, 'shadeColor');
  jest.spyOn(clrHSL, 'shadeColor');
  jest.spyOn(clr50, 'shadeColor');

  it('should return a darker shade of red by 20% passing in a RGB color', () => {  
    expect(clrHEX.shadeColor()).toEqual('#cc0000')
  });

  it('should return a darker shade of red by 20% passing in a RGB color', () => {  
    expect(clrRGB.shadeColor()).toEqual('#cc0000')
  });

  it('should return a darker shade of red by 20% passing in a HSL color', () => {  
    expect(clrHSL.shadeColor()).toEqual('#cc0000')
  });

  it('should return a darker shade of blue by 50% passing in a HEX color', () => {  
    expect(clrHSL.shadeColor()).toEqual('#001a4c')
  });
});