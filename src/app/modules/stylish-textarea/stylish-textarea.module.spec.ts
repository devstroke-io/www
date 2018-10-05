import { StylishTextareaModule } from './stylish-textarea.module';

describe('StylishTextareaModule', () => {
  let stylishTextareaModule: StylishTextareaModule;

  beforeEach(() => {
    stylishTextareaModule = new StylishTextareaModule();
  });

  it('should create an instance', () => {
    expect(stylishTextareaModule).toBeTruthy();
  });
});
