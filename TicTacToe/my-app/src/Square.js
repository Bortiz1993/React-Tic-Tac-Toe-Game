//Square is the Child Component of Board Component

function Square (props) {
    //     constructor(props){
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }  
            return (
                <button 
                className='square' id={props.id} onClick={props.onClick}>
                 {props.value}
                </button>
            );
    }

export default Square;