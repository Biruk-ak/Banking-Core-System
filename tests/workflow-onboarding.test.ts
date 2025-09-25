import { OnboardingWorkflow, OnboardingWorkflowService } from '../services/workflows/onboarding/src/workflow';

describe('Onboarding workflow', () => {
  test('transitions with checklist', () => {
    const wf = new OnboardingWorkflow('c1');
    wf.check('identityVerified');
    wf.transition('validated');
    wf.transition('compliance_check');
    expect(wf.context.stage).toBe('compliance_check');
  });

  test('service advances to settlement', () => {
    const svc = new OnboardingWorkflowService();
    const wf = svc.start('c1');
    const ctx = svc.advanceToSettlement(wf.context.workflowId);
    expect(ctx.stage).toBe('settled');
  });

  test('invalid transition throws', () => {
    const wf = new OnboardingWorkflow('c1');
    expect(() => wf.transition('settled')).toThrow(/Invalid/);
  });
});
