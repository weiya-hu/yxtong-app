// Msg.tsx
const Msg = ({type, text }:{ type:string,text: string }) => {
    return (
          <div className={`message ${type}`}>
              {/* <span className='icon' /> */}
              <span>{text}</span>
          </div>
    );
  };
  
  export default Msg;
  
  