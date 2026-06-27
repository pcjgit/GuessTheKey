import { KeySignature } from '../utils/keys';
import { Interval } from '../utils/intervals';
import { TimeSignature } from '../utils/timeSignatures';
import { Ornament } from '../utils/ornaments';
import { Cadence } from '../utils/cadences';
import { QuestionType } from '../App';
import { useEffect, useRef } from 'react';
import { Volume2, VolumeX, Key, MoveVertical, Clock, Sparkles, ListMusic, Sun, Moon, SunMoon } from 'lucide-react';

interface Clef {
  id: string;
  label: string;
  symbol?: string;
}

interface GameControlsProps {
  options: (KeySignature | Interval | TimeSignature | Ornament | Cadence)[];
  onSelect: (option: KeySignature | Interval | TimeSignature | Ornament | Cadence) => void;
  clefs: Clef[];
  activeClefs: string[];
  toggleClef: (clefId: string) => void;
  mode: 'major' | 'minor' | 'both';
  setMode: (mode: 'major' | 'minor' | 'both') => void;
  questionType: QuestionType;
  setQuestionType: (qt: QuestionType) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  disabled?: boolean;
  guessedOptions?: string[];
}

export default function GameControls({ 
  options, 
  onSelect, 
  clefs, 
  activeClefs, 
  toggleClef, 
  mode, 
  setMode,
  questionType,
  setQuestionType,
  soundEnabled,
  setSoundEnabled,
  disabled = false,
  guessedOptions = []
}: GameControlsProps) {
  const getDisabledStyle = (hasTitle: boolean) => ({
    opacity: 0.5,
    cursor: hasTitle ? 'help' : 'not-allowed'
  });

  const baseDisabledStyle = getDisabledStyle(false);

  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const prevDisabledRef = useRef(disabled);

  useEffect(() => {
    // If we just transitioned from disabled to enabled (e.g. feedback dismissed),
    // restore focus to the first available option so keyboard users don't lose their place.
    if (prevDisabledRef.current && !disabled) {
      firstOptionRef.current?.focus();
    }
    prevDisabledRef.current = disabled;
  }, [disabled]);

  return (
    <div className="game-controls">
      
      {/* Multiple Choice Options */}
      <div className="options-grid" role="group" aria-label="Answer options">
        {options.map((opt, i) => {
          const isGuessed = guessedOptions.includes(opt.name);
          const isOptionDisabled = disabled || isGuessed;
          const isFirstAvailable = !isGuessed && options.slice(0, i).every(o => guessedOptions.includes(o.name));

          const title = disabled ? "Options are disabled while viewing feedback" : (isGuessed ? "Incorrect guess" : undefined);
          const currentDisabledStyle = getDisabledStyle(!!title);

          return (
            <button
              key={i}
              ref={isFirstAvailable ? firstOptionRef : undefined}
              className="option-btn"
              onClick={() => onSelect(opt)}
              disabled={isOptionDisabled}
              style={isOptionDisabled ? (isGuessed ? { ...currentDisabledStyle, textDecoration: 'line-through' } : currentDisabledStyle) : undefined}
              title={title}
            >
              {isGuessed && <span className="sr-only">Incorrect guess: </span>}
              {opt.name}
              {'symbol' in opt && opt.symbol ? (
                <span aria-hidden="true" style={{ fontSize: '1.5em', marginLeft: '0.25em', verticalAlign: 'middle', fontFamily: '"Noto Music", "Bravura", "Segoe UI Symbol", "Apple Symbols", "Symbola", serif' }}>
                  {opt.symbol}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Settings Panel */}
      <div className="settings-panel">
        <div className="settings-group">
          <h4 id="qt-heading">Question Type</h4>
          <div className="toggle-group" role="group" aria-labelledby="qt-heading">
            <button
              className={`toggle-btn ${questionType === 'keys' ? 'active' : ''}`}
              onClick={() => setQuestionType('keys')}
              aria-pressed={questionType === 'keys'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <Key size={16} aria-hidden="true" /> Key Signatures
            </button>
            <button
              className={`toggle-btn ${questionType === 'intervals' ? 'active' : ''}`}
              onClick={() => setQuestionType('intervals')}
              aria-pressed={questionType === 'intervals'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <MoveVertical size={16} aria-hidden="true" /> Intervals
            </button>
            <button
              className={`toggle-btn ${questionType === 'timeSignatures' ? 'active' : ''}`}
              onClick={() => setQuestionType('timeSignatures')}
              aria-pressed={questionType === 'timeSignatures'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <Clock size={16} aria-hidden="true" /> Time Signatures
            </button>
            <button
              className={`toggle-btn ${questionType === 'ornaments' ? 'active' : ''}`}
              onClick={() => setQuestionType('ornaments')}
              aria-pressed={questionType === 'ornaments'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <Sparkles size={16} aria-hidden="true" /> Ornaments
            </button>
            <button
              className={`toggle-btn ${questionType === 'cadences' ? 'active' : ''}`}
              onClick={() => setQuestionType('cadences')}
              aria-pressed={questionType === 'cadences'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <ListMusic size={16} aria-hidden="true" /> Cadences
            </button>
          </div>
        </div>

        {questionType !== 'timeSignatures' && (
          <div className="settings-group">
            <h4 id="sound-heading">Sound</h4>
            <div className="toggle-group" role="group" aria-labelledby="sound-heading">
              <button
                className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-pressed={soundEnabled}
                disabled={disabled}
                style={disabled ? getDisabledStyle(true) : undefined}
                title={`Toggle sound ${soundEnabled ? 'off' : 'on'}`}
              >
                {soundEnabled ? (
                  <><Volume2 size={16} aria-hidden="true" /> Sound: On</>
                ) : (
                  <><VolumeX size={16} aria-hidden="true" /> Sound: Off</>
                )}
              </button>
            </div>
          </div>
        )}

        {questionType === 'keys' && (
          <div className="settings-group">
            <h4 id="mode-heading">Mode</h4>
          <div className="toggle-group" role="group" aria-labelledby="mode-heading">
            <button 
              className={`toggle-btn ${mode === 'major' ? 'active' : ''}`}
              onClick={() => setMode('major')}
              aria-pressed={mode === 'major'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <Sun size={16} aria-hidden="true" /> Major Keys
            </button>
            <button 
              className={`toggle-btn ${mode === 'minor' ? 'active' : ''}`}
              onClick={() => setMode('minor')}
              aria-pressed={mode === 'minor'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <Moon size={16} aria-hidden="true" /> Minor Keys
            </button>
            <button 
              className={`toggle-btn ${mode === 'both' ? 'active' : ''}`}
              onClick={() => setMode('both')}
              aria-pressed={mode === 'both'}
              disabled={disabled}
              style={disabled ? baseDisabledStyle : undefined}
            >
              <SunMoon size={16} aria-hidden="true" /> Both
            </button>
          </div>
        </div>
        )}

        <div className="settings-group">
          <h4 id="clefs-heading">Clefs (ABRSM Grade 5)</h4>
          <div className="toggle-group" role="group" aria-labelledby="clefs-heading">
            {clefs.map(c => {
              const isFinalActiveClef = activeClefs.length === 1 && activeClefs.includes(c.id);
              const isClefDisabled = disabled || isFinalActiveClef;

              return (
                <button
                  key={c.id}
                  className={`toggle-btn ${activeClefs.includes(c.id) ? 'active' : ''}`}
                  onClick={() => toggleClef(c.id)}
                  aria-pressed={activeClefs.includes(c.id)}
                  disabled={isClefDisabled}
                  style={isClefDisabled ? getDisabledStyle(!!(disabled || isFinalActiveClef)) : undefined}
                  title={isFinalActiveClef ? "At least one clef must be selected." : undefined}
                >
                  <span aria-hidden="true" style={{ fontSize: '1.2em', fontFamily: '"Noto Music", "Bravura", "Segoe UI Symbol", "Apple Symbols", "Symbola", serif' }}>
                    {c.symbol}
                  </span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
