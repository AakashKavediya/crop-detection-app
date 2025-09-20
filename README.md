# CropCare AI - Multi-Language Crop Disease Detection

A clean, simple AI-powered crop disease detection website that supports Hindi, English, and Nepali languages.

## Features

- **Multi-Language Support**: Interface available in English, Hindi (हिन्दी), and Nepali (नेपाली)
- **Image Upload**: Drag-and-drop or click to upload crop images (JPG, PNG, WebP up to 10MB)
- **AI Disease Detection**: Analyzes uploaded images to detect crop diseases and their stages
- **Treatment Recommendations**: Provides localized remedies and treatment suggestions
- **Responsive Design**: Clean, agricultural-themed interface that works on all devices
- **Real-time Language Switching**: Change language without losing current state

## How It Works

1. **Select Language**: Choose your preferred language from the dropdown (English/Hindi/Nepali)
2. **Upload Image**: Drag and drop or click to upload a photo of your crop
3. **AI Analysis**: The system analyzes the image for disease detection
4. **Get Results**: View disease identification, stage, confidence level, and treatment recommendations
5. **Treatment Guidance**: Follow the step-by-step remedies provided in your selected language

## Supported Diseases

- Leaf Blight (पत्ती झुलसा रोग / पात सुकाउने रोग)
- Powdery Mildew (चूर्णिल फफूंदी / धुलो ढुसी)
- Rust Disease (रतुआ रोग / खिया रोग)

## Technology Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **File Upload**: React Dropzone
- **Internationalization**: Custom translation system
- **AI Detection**: Simulated detection (ready for real AI integration)

## Getting Started

1. Upload a clear photo of your crop showing any potential disease symptoms
2. Wait for the AI analysis to complete
3. Review the results and follow the recommended treatments
4. Upload another image if needed

## Language Support

The application automatically detects your browser language and defaults to the appropriate language. You can manually switch languages at any time using the language selector in the header.

## Future Enhancements

- Integration with real AI/ML models for disease detection
- Additional crop types and diseases
- Weather-based recommendations
- Offline functionality
- Expert consultation features
