//Square is the Child Component of Board Component

function Square (props) {
    //     constructor(props){
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }  
    // console.log(props)
            return (
                <button style={{background: props.winner? "rgba(0, 0, 255, 0.5)" : " linear-gradient(45deg,black, transparent)" }}
                className='square' id={props.id} onClick={props.onClick} disabled={props.disabled}>
                 {props.value}
                </button>
            );
    }

export default Square;