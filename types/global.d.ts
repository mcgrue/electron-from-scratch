import assertType from 'assert';

//it's a kind of magic!
declare global {
  var assert: typeof assertType;
}

interface DocumentInfo {
  id: string;
  title: string;
}

interface WidgetInfo {
  id: string;
  title: string;
}

interface Vec2xy {
  x: number;
  y: number;
}
