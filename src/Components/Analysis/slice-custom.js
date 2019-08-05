import React from 'react';

import { connect } from 'react-redux';

import { Slice } from 'victory';



// class CustomSlice extends React.Component {

//     renderChildren() {
//         const children = React.Children.toArray(this.props.children);
//         return children.map((child) => {
//           // children should be rendered with props from their parent Victory components assigned
//           // Components like `VictoryChart` expect to control props like `domain` for their children
//           // Some props should be merged rather than overridden
//           const style = _.merge(child.props.style, this.props.style);
//           return React.cloneElement(child, Object.assign({}, child.props, this.props, { style }));
//         });
//     }

//     render() {
//         return (
//             <div>
//                 {this.renderChildren()}
//             </div>
//         )
//     }

// }

// export default CustomSlice;

const SliceHOC = (WrappedComponent) => {
    class HOC extends React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            console.log(this.props);
            return (
                    <WrappedComponent
                        { ...this.props} />

            );
        }
    }

    return HOC;
}

const WrapperComponent = SliceHOC(Slice);


export default connect(null, mapDispatchToProps)(WrapperComponent);