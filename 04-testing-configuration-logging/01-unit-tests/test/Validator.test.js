const Validator = require('../Validator');
const expect = require('chai').expect;
const {describe, it} = require('node:test');

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('валидатор проверяет строковые поля на минимум символом', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({name: 'Lalala'});

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 6');
    });
    it('валидатор проверяет строковые поля на максимум символов', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 1,
          max: 3,
        },
      });

      const errors = validator.validate({name: 'Lalal'});

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too long, expect 3, got 5');
    });
    it('валидатор проверяет строковые поле name на типовое значение', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({name: 404});

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got number');
    });
    it('валидатор проверяет строковые поля возраста минимум значения', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 4,
          max: 10,
        },
      });

      const errors = validator.validate({age: 3});

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too little, expect 4, got 3');
    });
    it('валидатор проверяет строковые поля возраста максимум значения', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 1,
          max: 4,
        },
      });

      const errors = validator.validate({age: 5});

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too big, expect 4, got 5');
    });
    it('валидатор проверяет строковые поля возраста на типизацию', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 1,
          max: 4,
        },
      });

      const errors = validator.validate({age: 'third'});

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');
    });
    it('валидатор проверяет строковые поля возраста и имени на минимум каждого свойства', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 3,
          max: 4,
        },
        age: {
          type: 'number',
          min: 3,
          max: 4,
        },
      });

      const errors = validator.validate({name: 'e', age: 2});

      expect(errors).to.have.length(2);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal(`too short, expect 3, got 1`);
      expect(errors[1]).to.have.property('error').and.to.be.equal('too little, expect 3, got 2');
    });
    it('валидатор проверяет строковые поля возраста и имени на максимум каждого свойства', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 3,
          max: 4,
        },
        age: {
          type: 'number',
          min: 3,
          max: 4,
        },
      });

      const errors = validator.validate({name: 'qwert', age: 5});

      expect(errors).to.have.length(2);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal(`too long, expect 4, got 5`);
      expect(errors[1]).to.have.property('error').and.to.be.equal('too big, expect 4, got 5');
    });
    it('валидатор проверяет строковые поля возраста и имени типизацию каждого свойства', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 3,
          max: 4,
        },
        age: {
          type: 'number',
          min: 3,
          max: 4,
        },
      });

      const errors = validator.validate({name: 3, age: 'abvgd'});

      expect(errors).to.have.length(2);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal(`expect string, got number`);
      expect(errors[1]).to.have.property('error').and.to.be.equal('expect number, got string');
    });
  });
});
