import { useState, useRef } from 'react';
import * as Tone from 'tone';
export const useRecordPersona = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const processedBlobRef = useRef<Blob | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/mp4' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        console.log('녹음 완료:', url);
        console.log('녹음된 Blob:', blob);
        audioChunks.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioURL(null);
    } catch (err) {
      console.error('마이크 접근 실패:', err);
    }
  };
  
const playWithRobotEffect = async () => {
        if (!audioURL) return;
        processedBlobRef.current = null;
        setIsProcessed(false);
        // Tone.js context 시작 (사용자 제스처 후에)
        await Tone.start();

        // Blob 가져오기
        const response = await fetch(audioURL);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // AudioContext에 디코딩
        const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);

        const recorder = new Tone.Recorder();
        // Tone.Player 생성 및 이펙터 연결
        const player = new Tone.Player(audioBuffer);
        const pitchShift = new Tone.PitchShift(-3);  // 5반음 낮춤 (로봇 음성)
        const distortion = new Tone.Distortion(4);  // 약간의 왜곡
        player.connect(pitchShift);
        pitchShift.connect(distortion);
        distortion.connect(recorder);
        distortion.toDestination();

        recorder.start();
        // 재생 시작
        player.start();
        player.onstop = () => {
            recorder.stop()
            .then((recordedBlob) => {processedBlobRef.current = recordedBlob;setIsProcessed(true);});
            player.dispose();
            pitchShift.dispose();
            distortion.dispose();
        };
    };

const playWithHighPitchEffect = async () => {
    if (!audioURL) return;
    processedBlobRef.current = null;
    setIsProcessed(false);
    await Tone.start();

    const response = await fetch(audioURL);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);

    // Tone.Player 인스턴스 생성
    const player = new Tone.Player();

    // 버퍼 직접 할당 (Tone.Buffer 생성자에 AudioBuffer 넘김)
    player.buffer = new Tone.Buffer().fromArray(audioBuffer.getChannelData(0));

    // 이펙터 연결
    const pitchShift = new Tone.PitchShift(8);
    const reverb = new Tone.Reverb(1); // 공간감 추가
    const gain = new Tone.Gain(3);
    // 체인 연결
    const recorder = new Tone.Recorder();
    player.chain(pitchShift, reverb, gain, Tone.Destination, recorder);
    recorder.start();
    player.start();
    player.onstop = () => {
      recorder.stop()
      .then((recordedBlob) => {processedBlobRef.current = recordedBlob;setIsProcessed(true);});
      player.dispose();
      pitchShift.dispose();
      reverb.dispose();
      gain.dispose();
    };
};

const playWithCyberpunkEffect = async () => {
    if (!audioURL) return;
    processedBlobRef.current = null;
    setIsProcessed(false);
    await Tone.start();

    const response = await fetch(audioURL);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);

    // Player 생성
    const player = new Tone.Player();
    player.buffer = new Tone.Buffer(audioBuffer);

    // 이펙트 설정
    const bitCrusher = new Tone.BitCrusher(4); // 낮은 비트 레이트
    const feedbackDelay = new Tone.FeedbackDelay("8n", 0.2); // 짧은 에코
    const reverb = new Tone.Reverb(1.5); // 공간감
    const pitchShift = new Tone.PitchShift(2); // 약간 높임
    const gain = new Tone.Gain(3);
    // 체인 연결
    const recorder = new Tone.Recorder();
    player.chain(pitchShift, bitCrusher, gain, feedbackDelay, reverb, Tone.Destination , recorder);

    
    recorder.start();
    player.start();

    player.onstop = () => {
        player.dispose();
        pitchShift.dispose();
        bitCrusher.dispose();
        feedbackDelay.dispose();
        reverb.dispose();
        gain.dispose();
        recorder.stop()
        .then((recordedBlob) => {processedBlobRef.current = recordedBlob;setIsProcessed(true);});
    };
};

const playWithRadioEffect = async () => {
    if (!audioURL) return;
    processedBlobRef.current = null;
    setIsProcessed(false);
    await Tone.start();

    const response = await fetch(audioURL);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);

    const player = new Tone.Player();
    player.buffer = new Tone.Buffer(audioBuffer);

    // EQ3 - 더 극단적으로 조절 (라디오 느낌 강조)
    const eq = new Tone.EQ3({
        low: -40,     // 저음 거의 완전 제거
        mid: 6,       // 중음 약간 올림 (대화 명확히)
        high: -20     // 고음 더 줄이기 (메탈릭한 느낌)
    });

    // Distortion - 강도 올림
    const distortion = new Tone.Distortion(0.7);

    // BitCrusher - 비트 수 줄여서 디지털 노이즈 생성
    const bitCrusher = new Tone.BitCrusher(4); // 4bit로 낮춤
    const recorder = new Tone.Recorder();
    // 체인 연결
    player.chain(eq, distortion, bitCrusher, Tone.Destination,recorder);
    
    recorder.start();
    player.start();
        player.onstop = () => {
            player.dispose();
            eq.dispose();
            distortion.dispose();
            recorder.stop()
            .then((recordedBlob) => {processedBlobRef.current = recordedBlob;
                                    setIsProcessed(true);});
        };
};

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    playWithRobotEffect,
    playWithHighPitchEffect,
    playWithCyberpunkEffect,
    playWithRadioEffect,
    processedBlobRef,
    isProcessed,
  };
};
