import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom'
import { 
  none, 
  TOOL_NONE, 
  line, 
  TOOL_LINE, 
  rectangle, 
  TOOL_RECTANGLE, 
  ellipse,
  TOOL_ELLIPSE,
  eraser,
  TOOL_ERASER,
} from '../tools';

export const toolsMap = {
  [TOOL_NONE]: none,
  [TOOL_LINE]: line,
  [TOOL_RECTANGLE]: rectangle,
  [TOOL_ELLIPSE]: ellipse,
  [TOOL_ERASER]: eraser,
};

export default class SketchPad extends Component {

  tool = null;
  interval = null;

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    allItems: PropTypes.array.isRequired,
    setItems: PropTypes.func,
    animate: PropTypes.bool,
    canvasClassName: PropTypes.string,
    color: PropTypes.string,
    fillColor: PropTypes.string,
    size: PropTypes.number,
    tool: PropTypes.string,
    toolsMap: PropTypes.object,
    onItemStart: PropTypes.func, // function(stroke:Stroke) { ... }
    onEveryItemChange: PropTypes.func, // function(idStroke:string, x:number, y:number) { ... }
    onDebouncedItemChange: PropTypes.func, // function(idStroke, points:Point[]) { ... }
    onCompleteItem: PropTypes.func, // function(stroke:Stroke) { ... }
    debounceTime: PropTypes.number,
  };

  static defaultProps = {
    width: 500,
    height: 500,
    color: '#000',
    size: 5,
    fillColor: '',
    canvasClassName: 'canvas',
    debounceTime: 1000,
    animate: true,
    tool: TOOL_LINE,
    toolsMap
  };

  constructor(props) {
    super(props);
    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    const { tool, stagedItems, setStagedItems } = this.props;
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.initTool(tool, stagedItems, setStagedItems);
  }

  componentWillReceiveProps({tool, allItems, stagedItems, setStagedItems}) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    allItems
      .forEach(item => {
        console.log(item)
        this.initTool(item.tool, stagedItems, setStagedItems);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool, stagedItems, setStagedItems);
  }

  initTool(tool, items, setItems) {
    this.tool = this.props.toolsMap[tool](this.ctx, items, setItems);
  }

  onMouseDown(e) {
    const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
    data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
    }
  }

  onDebouncedMove() {
    if (typeof this.tool.onDebouncedMouseMove === 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  }

  onMouseMove(e) {
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
  }

  onMouseUp(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  getCursorPosition(e) {
    const {top, left} = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  render() {
    const {width, height, canvasClassName} = this.props;
    return (
      <canvas
        id='staging-canvas'
        ref={(canvas) => { this.canvasRef = canvas; }}
        className={canvasClassName}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseUp}
        onMouseUp={this.onMouseUp}
        width={width}
        height={height}
      />
    )
  }
}