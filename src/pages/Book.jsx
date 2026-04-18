import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageProvider } from '../components/gz/LanguageContext';
import ScheduleConversationModal from '../components/gz/ScheduleConversationModal';

function BookContent() {
  const navigate = useNavigate();

  return <ScheduleConversationModal open onClose={() => navigate('/')} />;
}

export default function Book() {
  return (
    <LanguageProvider>
      <BookContent />
    </LanguageProvider>
  );
}
