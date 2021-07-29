import {expect, test} from '@oclif/test'

describe('ssw', () => {
  test
  .stdout()
  .command(['ssw'])
  .it('runs ssw', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['hello', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
