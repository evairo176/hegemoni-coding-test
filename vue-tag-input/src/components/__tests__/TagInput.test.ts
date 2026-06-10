import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TagInput from '../TagInput.vue'

describe('TagInput', () => {
  it('TH-01: displays input with correct placeholder', () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Type a tag and press Enter')
  })

  it('TH-02: pressing Enter adds a tag from input value', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    const tags = wrapper.findAll('.tag-text')
    expect(tags).toHaveLength(1)
    expect(tags[0].text()).toBe('vue')
  })

  it('TH-03: input is cleared after adding a tag', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('TH-04: whitespace is trimmed before validation', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('  react  ')
    await input.trigger('keydown.enter')
    
    const tags = wrapper.findAll('.tag-text')
    expect(tags).toHaveLength(1)
    expect(tags[0].text()).toBe('react')
  })

  it('TH-05: empty tags (whitespace only) are not added', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('   ')
    await input.trigger('keydown.enter')
    
    const tags = wrapper.findAll('.tag-text')
    expect(tags).toHaveLength(0)
  })

  it('TH-06: duplicate tags are rejected', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    const tags = wrapper.findAll('.tag-text')
    expect(tags).toHaveLength(1)
  })

  it('TH-07: case-sensitive duplicate detection', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('Vue')
    await input.trigger('keydown.enter')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    const tags = wrapper.findAll('.tag-text')
    expect(tags).toHaveLength(2)
    expect(tags[0].text()).toBe('Vue')
    expect(tags[1].text()).toBe('vue')
  })

  it('TH-08: each tag has a remove button', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    await input.setValue('react')
    await input.trigger('keydown.enter')
    
    const removeButtons = wrapper.findAll('.tag-remove')
    expect(removeButtons).toHaveLength(2)
  })

  it('TH-09: clicking remove deletes the correct tag', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    await input.setValue('react')
    await input.trigger('keydown.enter')
    
    await input.setValue('angular')
    await input.trigger('keydown.enter')
    
    const removeButtons = wrapper.findAll('.tag-remove')
    await removeButtons[1].trigger('click')
    
    const tags = wrapper.findAll('.tag-text')
    expect(tags).toHaveLength(2)
    expect(tags[0].text()).toBe('vue')
    expect(tags[1].text()).toBe('angular')
  })

  it('TH-10: correct ARIA list structure', () => {
    const wrapper = mount(TagInput)
    
    const list = wrapper.find('[role="list"]')
    expect(list.exists()).toBe(true)
    expect(list.element.tagName).toBe('UL')
  })

  it('TH-11: remove button has descriptive aria-label', async () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    
    await input.setValue('vue')
    await input.trigger('keydown.enter')
    
    const removeButton = wrapper.find('.tag-remove')
    expect(removeButton.attributes('aria-label')).toBe('Remove tag vue')
  })

  it('TH-15: input has correct aria-label', () => {
    const wrapper = mount(TagInput)
    const input = wrapper.find('input')
    expect(input.attributes('aria-label')).toBe('Add a tag')
  })
})
