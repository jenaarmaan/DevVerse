
import type { LucideIcon } from "lucide-react";
import { Globe, Smartphone, BrainCircuit, Puzzle } from "lucide-react";

export type Technology = {
  id: string;
  category: 'Web' | 'Mobile' | 'AI/ML' | 'Other';
  title: string;
  description: string;
  docsUrl: string;
  githubUrl: string;
  iconUrl: string;
  dataAiHint: string;
  tags: string[];
  type?: 'DL' | 'ML' | 'LLM' | 'API' | 'Auth' | 'Library' | 'Automation' | 'Framework' | 'Styling' | 'Language';
};

export type Category = {
    id: 'web' | 'mobile' | 'ai' | 'other';
    title: string;
    icon: LucideIcon;
    description: string;
};

export const categories: Record<Category['id'], Category> = {
  web: { id: 'web', title: 'Web Technologies', icon: Globe, description: 'Explore tools and frameworks for building modern, responsive, and scalable web applications.' },
  mobile: { id: 'mobile', title: 'Mobile SDKs', icon: Smartphone, description: 'Discover SDKs and frameworks for crafting beautiful, high-performance mobile apps for any device.' },
  ai: { id: 'ai', title: 'AI/ML Tools', icon: BrainCircuit, description: 'Leverage powerful AI and Machine Learning models to build intelligent, next-generation applications.' },
  other: { id: 'other', title: 'Other Tech Tools', icon: Puzzle, description: 'A collection of other essential APIs and tools from across Google to enhance your projects.' },
};

export const technologies: Technology[] = [
  // Web
  { id: 'firebase', category: 'Web', title: 'Firebase', description: 'A comprehensive app development platform with services like auth, databases, and hosting.', docsUrl: 'https://firebase.google.com/docs', githubUrl: 'https://github.com/firebase/firebase-js-sdk', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'firebase logo', tags: ['Backend', 'Auth', 'Hosting'], type: 'API' },
  { id: 'angular', category: 'Web', title: 'Angular', description: 'A platform for building mobile and desktop web applications. Maintained by Google.', docsUrl: 'https://angular.dev/', githubUrl: 'https://github.com/angular/angular', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'angular logo', tags: ['Frontend', 'Framework'], type: 'Framework' },
  { id: 'puppeteer', category: 'Web', title: 'Puppeteer', description: 'A Node.js library which provides a high-level API to control Chrome/Chromium via DevTools Protocol.', docsUrl: 'https://pptr.dev/', githubUrl: 'https://github.com/puppeteer/puppeteer', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'puppeteer logo', tags: ['Testing', 'Automation'], type: 'Library' },
  { id: 'chrome-devtools', category: 'Web', title: 'Chrome DevTools', description: 'A set of web developer tools built directly into the Google Chrome browser.', docsUrl: 'https://developer.chrome.com/docs/devtools', githubUrl: 'https://github.com/GoogleChrome/devtools-samples', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'chrome logo', tags: ['Debugging', 'Performance'], type: 'Library' },

  // Mobile
  { id: 'flutter', category: 'Mobile', title: 'Flutter', description: 'Google\'s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop.', docsUrl: 'https://docs.flutter.dev/', githubUrl: 'https://github.com/flutter/flutter', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'flutter logo', tags: ['Cross-platform', 'UI'], type: 'Framework' },
  { id: 'android-sdk', category: 'Mobile', title: 'Android SDK', description: 'The official development kit for Android application development, including tools, libraries, and APIs.', docsUrl: 'https://developer.android.com/docs', githubUrl: 'https://github.com/android', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'android logo', tags: ['Native', 'Android', 'Kotlin'], type: 'Framework' },
  { id: 'firebase-mobile', category: 'Mobile', title: 'Firebase for Mobile', description: 'Backend services for mobile apps, including auth, analytics, databases, and push notifications.', docsUrl: 'https://firebase.google.com/docs/android/setup', githubUrl: 'https://github.com/firebase/firebase-android-sdk', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'firebase logo', tags: ['Backend', 'iOS', 'Android'], type: 'API' },
  
  // AI/ML
  { id: 'gemini', category: 'AI/ML', title: 'Gemini API', description: 'Access Google\'s most capable and general set of generative AI models for your applications.', docsUrl: 'https://ai.google.dev/docs', githubUrl: 'https://github.com/google/generative-ai-docs', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'gemini logo', tags: ['GenAI', 'Multimodal', 'LLM'], type: 'LLM' },
  { id: 'tensorflow', category: 'AI/ML', title: 'TensorFlow', description: 'An end-to-end open source platform for machine learning and deep learning.', docsUrl: 'https://www.tensorflow.org/overview', githubUrl: 'https://github.com/tensorflow/tensorflow', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'tensorflow logo', tags: ['Deep Learning', 'Python'], type: 'DL' },
  { id: 'keras', category: 'AI/ML', title: 'Keras', description: 'A deep learning API written in Python, running on top of TensorFlow, designed for fast experimentation.', docsUrl: 'https://keras.io/', githubUrl: 'https://github.com/keras-team/keras', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'keras logo', tags: ['Deep Learning', 'API'], type: 'DL' },
  { id: 'vertex-ai', category: 'AI/ML', title: 'Vertex AI', description: 'A unified AI platform to build, deploy, and scale ML models faster with fully-managed infrastructure.', docsUrl: 'https://cloud.google.com/vertex-ai/docs', githubUrl: 'https://github.com/GoogleCloudPlatform/vertex-ai-samples', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'vertexai logo', tags: ['MLOps', 'Google Cloud'], type: 'ML' },
  
  // Other
  { id: 'google-maps', category: 'Other', title: 'Google Maps Platform', description: 'Add real-world context to your apps with dynamic maps, routes, and places from Google.', docsUrl: 'https://developers.google.com/maps/documentation', githubUrl: 'https://github.com/googlemaps/js-samples', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'google maps', tags: ['Maps', 'Geolocation'], type: 'API' },
  { id: 'google-cloud', category: 'Other', title: 'Google Cloud', description: 'A suite of cloud computing services for compute, storage, networking, and more.', docsUrl: 'https://cloud.google.com/docs', githubUrl: 'https://github.com/GoogleCloudPlatform', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'google cloud', tags: ['Cloud', 'Infrastructure'], type: 'API'},
  { id: 'google-apps-script', category: 'Other', title: 'Google Apps Script', description: 'Automate tasks across Google products like Forms, Sheets, and Docs with cloud-based JavaScript.', docsUrl: 'https://developers.google.com/apps-script', githubUrl: 'https://github.com/googleworkspace/apps-script-samples', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'apps script', tags: ['Automation', 'Workspace'], type: 'Automation' },
  { id: 'firebase-auth', category: 'Other', title: 'Firebase Authentication', description: 'Provides backend services, SDKs, and UI libraries to authenticate users to your app.', docsUrl: 'https://firebase.google.com/docs/auth', githubUrl: 'https://github.com/firebase/FirebaseUI-web', iconUrl: 'https://placehold.co/48x48.png', dataAiHint: 'firebase auth', tags: ['Authentication', 'Security'], type: 'Auth' },
];

export const popularTechnologies = technologies.filter(t => ['firebase', 'flutter', 'gemini', 'android-sdk'].includes(t.id));
