import { useLottie } from "lottie-react";
import Lottie from "lottie-react";
import empty from "./../animations/work.json"

const Working = () => {
  const options = {
    animationData: empty,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90%' }}>
        <div>
          <Lottie style={{ width: 480, padding: 0, margin: 0, borderRadius:14 }} animationData={empty} loop={true} /> <br /><br />
          <h3 style={{ textAlign: 'center', color: '#008F8C' }}>Trabajando....</h3>
        </div>

      </div>

    </>

  )
};

export default Working;