import { aiService } from '@/services/aiService.js';
import { ok, fail } from '@/utils/result.js';

export const aiLogic = {
  async ask(prompt) {
    try {
      const reply = await aiService.ask(prompt);
      return ok(reply);
    } catch (err) { return fail(err); }
  },

  async chat(messages) {
    try {
      const reply = await aiService.chat(messages);
      return ok(reply);
    } catch (err) { return fail(err); }
  },
};

export default aiLogic;
