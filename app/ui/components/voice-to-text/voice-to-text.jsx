import React from 'react'
import styles from './Chat.module.css';
import { SpeechRecognitionService } from '../../Services/SpeechRecognitionService';



const VoiceToTextComponent = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [animationHeights, setAnimationHeights] = useState<Array<number>>([]);

  return (
    <div>
      chat component
    </div>
  )
}

export default VoiceToTextComponent
