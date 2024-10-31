import React, { useState } from 'react';
import { Star, Award, Trophy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';

const HebrewTypingGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [input, setInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [completedLevels, setCompletedLevels] = useState(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);

  const letterGroups = [
    { title: 'אותיות שורת הבית', letters: 'חלךף' },
    { title: 'אותיות שורה עליונה', letters: 'קראטון' },
    { title: 'אותיות שורה תחתונה', letters: 'זסבהנמ' },
    { title: 'אותיות נוספות', letters: 'פשדגכעי' },
    { title: 'אותיות סופיות', letters: 'םןץףך' },
  ];

  const words = ["שלום", "לומדים", "הקלדה", "עברית"];
  const sentences = ["שלום עולם", "לומדים הקלדה עיוורת", "תרגול עושה את המאסטר"];
  const paragraph = "המשחק הזה נועד ללמד אותך הקלדה עיוורת בעברית, תוך כדי כיף ותמיכה!";

  const levels = [
    ...letterGroups.flatMap((group, groupIndex) =>
      group.letters.split('').map((letter, letterIndex) => ({
        id: groupIndex * 10 + letterIndex + 1,
        type: 'letter',
        content: letter,
        title: group.title
      }))
    ),
    ...words.map((word, index) => ({
      id: 100 + index,
      type: 'word',
      content: word,
    })),
    ...sentences.map((sentence, index) => ({
      id: 200 + index,
      type: 'sentence',
      content: sentence,
    })),
    { id: 300, type: 'paragraph', content: paragraph },
  ];

  const currentTask = levels.find(level => level.id === currentLevel);

  const checkInput = () => {
    if (input === currentTask.content) {
      setCompletedLevels(prev => new Set(prev).add(currentLevel));
      setShowError(false);
      if (currentLevel < levels.length) {
        setCurrentLevel(currentLevel + 1);
        setInput('');
      } else {
        setGameCompleted(true);
      }
    } else {
      setShowError(true);
    }
  };

  const containerStyle = {
    backgroundImage: 'url(erez1.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh'
  };

  if (gameCompleted) {
    return (
      <div style={containerStyle} className="flex items-center justify-center min-h-screen">
        <Card className="p-8 max-w-2xl mx-auto text-center bg-white/90">
          <h1 className="text-3xl font-bold mb-6">כל הכבוד! סיימת את כל השלבים!</h1>
          <img src="erez2.png" alt="גביע סיום" className="mx-auto mb-6 h-48 w-auto"/>
          <p className="text-xl">השלמת בהצלחה את כל שלבי המשחק!</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={containerStyle} className="flex items-center justify-center min-h-screen p-4">
      <Card className="p-6 max-w-2xl mx-auto text-right bg-white/90">
        <h1 className="text-2xl font-bold mb-4 text-center">משחק הקלדה עיוורת בעברית</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{currentTask.title || 'שלב תרגול'}</h2>
          <p className="text-gray-600 mb-2">
            {currentTask.type === 'letter' ? "הקלידו את האות הבאה:" : 
             currentTask.type === 'word' ? "הקלידו את המילה הבאה:" :
             currentTask.type === 'sentence' ? "הקלידו את המשפט הבא:" :
             "הקלידו את הפסקה הבאה:"}
          </p>
          <p className="text-lg font-bold mb-4 p-4 bg-gray-100 rounded">{currentTask.content}</p>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkInput()}
            placeholder="הקלידו כאן"
            className="flex-1 p-2 border rounded text-right"
            dir="rtl"
          />
          <button 
            onClick={checkInput}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            בדיקה
          </button>
        </div>
        
        {showError && (
          <Alert className="mb-4">
            <AlertTitle>טעות</AlertTitle>
            <AlertDescription>נסו שוב להקליד בצורה נכונה!</AlertDescription>
          </Alert>
        )}
        
        {completedLevels.has(currentLevel) && (
          <div className="flex items-center gap-2 text-green-600">
            {currentTask.type === 'word' && <Star className="h-6 w-6" />}
            {currentTask.type === 'sentence' && <Award className="h-6 w-6" />}
            {currentTask.type === 'paragraph' && <Trophy className="h-6 w-6" />}
            <p>מעולה! עברתם לשלב הבא!</p>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-500">
          שלב {currentLevel} מתוך {levels.length}
        </div>
      </Card>
    </div>
  );
};

export default HebrewTypingGame;