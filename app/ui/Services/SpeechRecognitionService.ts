 import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
 import { Subject } from 'rxjs';

export class SpeechRecognitionService {
    private speechConfig: SpeechSDK.SpeechConfig;
    private audioConfig: SpeechSDK.AudioConfig;
    private recognizer: SpeechSDK.SpeechRecognizer;
    private transcriptSubject = new Subject<string>();
    private lastTranscript = '';
    private debounceTimer: any;

    constructor() {
        const subscriptionKey = '4359db1d06d4495dbde2aa59f884c3ef';
        const serviceRegion = 'westeurope';
        this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        this.audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, this.audioConfig);
    }

    getTranscriptObservable() {
        return this.transcriptSubject;
    }

    startListening() {
        // Event handlers for recognition results
        this.recognizer.recognizing = (s, e) => {
            // Ignore intermediate results
        };

        this.recognizer.recognized = (s, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                const currentTranscript = e.result.text.trim();

                if (currentTranscript && currentTranscript !== this.lastTranscript) {
                    // Debounce to avoid rapid updates
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => {
                        this.lastTranscript = currentTranscript;
                        this.transcriptSubject.next(currentTranscript);
                    }, 300); // Adjust debounce time as needed
                }
            } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
                console.log('No speech could be recognized.');
            }
        };

        this.recognizer.canceled = (s, e) => {
            console.error(`Recognition canceled: ${e.reason}`);
            this.transcriptSubject.error(e.errorDetails);
            this.stopListening(); // Clean up the recognizer
        };

        this.recognizer.startContinuousRecognitionAsync(
            () => {
                console.log('Speech recognition started.');
            },
            err => {
                console.error('Error starting continuous recognition:', err);
                this.transcriptSubject.error(err);
                this.stopListening(); // Clean up the recognizer
            }
        );
    }

    stopListening() {
        if (this.recognizer) {
            this.recognizer.stopContinuousRecognitionAsync(
                () => {
                    console.log('Speech recognition stopped.');
                },
                err => {
                    console.error('Error stopping continuous recognition:', err);
                }
            );
            this.recognizer.close(); // Ensure the recognizer is disposed after use
        }
    }
}
