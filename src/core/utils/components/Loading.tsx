import { useLottie } from "lottie-react";
import Lottie from "lottie-react";
import empty from "./../animations/circle.json"

const Loading = () => {

  const options = {
    animationData: empty,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', height: '90%' }}>
        <div>
          <Lottie style={{ width: 450, padding: 0, margin: 0 }} animationData={empty} loop={true} /> <br />
        </div>

      </div>
    </>

  )
}

export default Loading