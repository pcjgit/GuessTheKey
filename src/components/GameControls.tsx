import { KeySignature } from '../utils/keys';
import { Interval } from '../utils/intervals';
import { TimeSignature } from '../utils/timeSignatures';
import { Ornament } from '../utils/ornaments';
import { Cadence } from '../utils/cadences';
import { QuestionType } from '../App';

interface Clef {
  id: string;
  label: string;
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
  disabled
}: GameControlsProps) {
  const disabledStyle = { opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' };

  return (
    <div className="game-controls">
      
      {/* Multiple Choice Options */}
      <div className="options-grid">
        {options.map((opt, i) => (
          <button 
            key={i} 
            className="option-btn"
            onClick={() => onSelect(opt)}
            disabled={disabled}
            style={disabledStyle}
          >
            {opt.name}
            {'symbol' in opt && opt.symbol ? (
              <span style={{ fontSize: '1.5em', marginLeft: '0.25em', verticalAlign: 'middle', fontFamily: '"Noto Music", "Bravura", "Segoe UI Symbol", "Apple Symbols", "Symbola", serif' }}>
                {opt.symbol}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Settings Panel */}
      <div className="settings-panel">
        <div className="settings-group">
          <h4>Question Type</h4>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${questionType === 'keys' ? 'active' : ''}`}
              onClick={() => setQuestionType('keys')}
              aria-pressed={questionType === 'keys'}
              disabled={disabled}
              style={disabledStyle}
            >
              Key Signatures
            </button>
            <button
              className={`toggle-btn ${questionType === 'intervals' ? 'active' : ''}`}
              onClick={() => setQuestionType('intervals')}
              aria-pressed={questionType === 'intervals'}
              disabled={disabled}
              style={disabledStyle}
            >
              Intervals
            </button>
            <button
              className={`toggle-btn ${questionType === 'timeSignatures' ? 'active' : ''}`}
              onClick={() => setQuestionType('timeSignatures')}
              aria-pressed={questionType === 'timeSignatures'}
              disabled={disabled}
              style={disabledStyle}
            >
              Time Signatures
            </button>
            <button
              className={`toggle-btn ${questionType === 'ornaments' ? 'active' : ''}`}
              onClick={() => setQuestionType('ornaments')}
              aria-pressed={questionType === 'ornaments'}
              disabled={disabled}
              style={disabledStyle}
            >
              Ornaments
            </button>
            <button
              className={`toggle-btn ${questionType === 'cadences' ? 'active' : ''}`}
              onClick={() => setQuestionType('cadences')}
              aria-pressed={questionType === 'cadences'}
              disabled={disabled}
              style={disabledStyle}
            >
              Cadences
            </button>
          </div>
        </div>

        {(questionType === 'intervals' || questionType === 'cadences') && (
          <div className="settings-group">
            <h4>Sound</h4>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
                onClick={() => setSoundEnabled(true)}
                aria-pressed={soundEnabled}
                disabled={disabled}
                style={disabledStyle}
              >
                Sound: On
              </button>
              <button
                className={`toggle-btn ${!soundEnabled ? 'active' : ''}`}
                onClick={() => setSoundEnabled(false)}
                aria-pressed={!soundEnabled}
                disabled={disabled}
                style={disabledStyle}
              >
                Sound: Off
              </button>
            </div>
          </div>
        )}

        {questionType === 'keys' && (
          <div className="settings-group">
            <h4>Mode</h4>
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${mode === 'major' ? 'active' : ''}`}
              onClick={() => setMode('major')}
              aria-pressed={mode === 'major'}
              disabled={disabled}
              style={disabledStyle}
            >
              Major Keys
            </button>
            <button 
              className={`toggle-btn ${mode === 'minor' ? 'active' : ''}`}
              onClick={() => setMode('minor')}
              aria-pressed={mode === 'minor'}
              disabled={disabled}
              style={disabledStyle}
            >
              Minor Keys
            </button>
            <button 
              className={`toggle-btn ${mode === 'both' ? 'active' : ''}`}
              onClick={() => setMode('both')}
              aria-pressed={mode === 'both'}
              disabled={disabled}
              style={disabledStyle}
            >
              Both
            </button>
          </div>
        </div>
        )}

        <div className="settings-group">
          <h4>Clefs (ABRSM Grade 5)</h4>
          <div className="toggle-group">
            {clefs.map(c => {
              const isOnlyActiveClef = activeClefs.length === 1 && activeClefs.includes(c.id);
              const isClefDisabled = disabled || isOnlyActiveClef;
              return (
                <button
                  key={c.id}
                  className={`toggle-btn ${activeClefs.includes(c.id) ? 'active' : ''}`}
                  onClick={() => toggleClef(c.id)}
                  aria-pressed={activeClefs.includes(c.id)}
                  disabled={isClefDisabled}
                  style={{ opacity: isClefDisabled ? 0.5 : 1, cursor: isClefDisabled ? 'not-allowed' : 'pointer' }}
                  title={isOnlyActiveClef ? "At least one clef must be selected" : undefined}
                >
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
