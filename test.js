const qr = require('qrcode');
const fs = require('fs');
const Jimp = require('jimp');

const dataToEncode = 'Hello, World2222!'; // QR 코드로 인코딩할 데이터
// const dataToEncode = 'https://www.google.com/search?sxsrf=AB5stBgqYqSDGAcrbGoj2gGevoXdBTss1g:1690467621264&q=React-qrcode-logo&sa=X&ved=2ahUKEwjkiMfQiq-AAxUJQPUHHdMpAyQQ1QJ6BAgKEAE&cshid=1690467629205046&biw=2560&bih=1297&dpr=1#imgrc=k8YGRFWBK3PqcM&imgdii=75oququImrf1HM'; // QR 코드로 인코딩할 데이터

// QR 코드 옵션 설정
const options = {
  // 기본적인 옵션
  errorCorrectionLevel: 'H', // 오류 정정 레벨 (L, M, Q, H)
  type: 'image/png', // 이미지 타입 (jpeg, png 등)
  margin: 2, // QR 코드 주변 여백
  scale: 8, // QR 코드 크기

  // 커스텀 옵션
  color: {
    dark: '#000000', // QR 코드의 블록(암호화된 부분) 색상
    light: '#ffffff', // QR 코드의 빈 공간(암호화되지 않은 부분) 색상
  },
};

// QR 코드 생성
qr.toFile('custom_qrcode2.png', dataToEncode, options, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
  } else {
    console.log('QR code successfully generated!');
    applyDesignToQRCode();
  }
});

async function applyDesignToQRCode() {
  // 이 함수에서는 생성된 QR 코드 이미지에 디자인을 적용하는 작업을 수행합니다.
  // 예를 들어, 다른 이미지를 로드하여 코드 부분을 감싸는 등의 디자인 변경이 가능합니다.
  // 이 부분은 간략한 예제이므로, 실제로 어떤 디자인을 적용할지는 상황에 맞게 결정해야 합니다.
  // 다양한 이미지 편집 도구 또는 그래픽 디자인 도구를 사용하여 작업할 수 있습니다.

  // const backgroundImageFile = 'testtest.png'; // 디자인할 이미지 파일 (예시: background.png)
  const backgroundImageFile = 'testtest2.png'; // 디자인할 이미지 파일 (예시: background.png)

  try {
    // 이미지 파일 로드
    const qrCodeImage = await Jimp.read('custom_qrcode2.png');
    const backgroundImage = await Jimp.read(backgroundImageFile);

    // QR 코드 이미지의 크기에 맞게 배경 이미지를 리사이즈
    backgroundImage.resize(
      qrCodeImage.bitmap.width / 2.5,
      qrCodeImage.bitmap.height / 2.5
    );

    // 배경 이미지가 보이지만, 카메라가 QR Code로 인식을 못함
    // 이미지의 크기를 QR Code 데이터를 읽을 수 있는 정도로 사이즈를 조절해야 한다.
    // QR 코드 이미지와 배경 이미지를 합성하여 디자인 적용
    // qrCodeImage.composite(backgroundImage, 0, 0);
    qrCodeImage.composite(
      backgroundImage,
      qrCodeImage.bitmap.width / 4,
      qrCodeImage.bitmap.height / 4
    );

    // 배경 이미지가 qr code 뒤로가서 전혀 안보임
    // qrCodeImage.composite(backgroundImage, 0, 0, {
    //   mode: Jimp.BLEND_DESTINATION_OVER, // 배경 이미지가 뒤로 오도록 합성 모드 설정
    // });

    // 합성된 이미지를 파일로 저장
    await qrCodeImage.writeAsync('qrcode_with_design.png');
  } catch (error) {
    console.error('Error applying design to QR code:', error);
  }
}
