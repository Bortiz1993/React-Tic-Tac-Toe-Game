//Square is the Child Component of Board Component

function Square (props) {

    console.log(props)
    //here is the stylings for the column that wins
            return (
                <button style={{background:
                 props.winner? "rgba(0, 0, 255, 0.5)" :
                 props.draw? 'red':
                  " linear-gradient(45deg,black, transparent)" }}
                className='square' id={props.id} onClick={props.onClick} disabled={props.disabled}>
                 {props.value}
                </button>
            );
    }

export default Square;