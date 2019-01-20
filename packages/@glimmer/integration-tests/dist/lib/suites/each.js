var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RenderTest } from '../render-test';
import { test } from '../test-decorator';
export class EachSuite extends RenderTest {
    'basic #each'() {
        let list = [1, 2, 3, 4];
        this.render('{{#each list key="@index" as |item|}}{{item}}{{else}}Empty{{/each}}', {
            list,
        });
        this.assertHTML('1234');
        this.assertStableRerender();
        list.push(5, 6);
        this.rerender({ list });
        this.assertHTML('123456');
        this.assertStableNodes();
        list = [];
        this.rerender({ list });
        this.assertHTML('Empty');
        this.assertStableNodes();
        list = [1, 2, 3, 4];
        this.rerender({ list });
        this.assertHTML('1234');
        this.assertStableNodes();
    }
    'keyed #each'() {
        let list = [{ text: 'hello' }];
        this.render('{{#each list key="text" as |item|}}{{item.text}}{{else}}Empty{{/each}}', {
            list,
        });
        this.assertHTML('hello');
        this.assertStableRerender();
        list.push({ text: ' ' });
        list.push({ text: 'World' });
        this.rerender({ list });
        this.assertHTML('hello World');
        this.assertStableNodes();
        list = [];
        this.rerender({ list });
        this.assertHTML('Empty');
        this.assertStableNodes();
        list = [{ text: 'hello' }];
        this.rerender({ list });
        this.assertHTML('hello');
        this.assertStableNodes();
    }
    'receives the index as the second parameter'() {
        let list = [1, 2, 3, 4];
        this.render('{{#each list key="@index" as |item i|}}{{item}}-{{i}}:{{else}}Empty{{/each}}', {
            list,
        });
        this.assertHTML('1-0:2-1:3-2:4-3:');
        this.assertStableRerender();
        list.push(5, 6);
        this.rerender({ list });
        this.assertHTML('1-0:2-1:3-2:4-3:5-4:6-5:');
        this.assertStableNodes();
        list = [];
        this.rerender({ list });
        this.assertHTML('Empty');
        this.assertStableNodes();
        list = [1, 2, 3, 4];
        this.rerender({ list });
        this.assertHTML('1-0:2-1:3-2:4-3:');
        this.assertStableNodes();
    }
    'receives the index as the second parameter (when key=@identity)'() {
        let v1 = val(1);
        let v2 = val(2);
        let v3 = val(3);
        let v4 = val(4);
        let v5 = val(5);
        let v6 = val(6);
        let list = [v1, v2, v3, v4];
        this.render('{{#each list key="@identity" as |item i|}}{{item.val}}-{{i}}{{else}}Empty{{/each}}', {
            list,
        });
        this.assertHTML('1-02-13-24-3');
        this.assertStableRerender();
        list.push(v5, v6);
        this.rerender({ list });
        this.assertHTML('1-02-13-24-35-46-5');
        this.assertStableNodes();
        v1.val = 1000;
        this.rerender({ list });
        this.assertHTML('1000-02-13-24-35-46-5');
        this.assertStableNodes();
        list = [];
        this.rerender({ list });
        this.assertHTML('Empty');
        this.assertStableNodes();
        list = [val(1), val(2), val(3), val(4)];
        this.rerender({ list });
        this.assertHTML('1-02-13-24-3');
        this.assertStableNodes();
    }
    'it can render duplicate primitive items'() {
        let list = ['a', 'a', 'a'];
        this.render('{{#each list key="@index" as |item|}}{{item}}{{/each}}', {
            list,
        });
        this.assertHTML('aaa');
        this.assertStableRerender();
        list.push('a', 'a');
        this.rerender({ list });
        this.assertHTML('aaaaa');
        this.assertStableNodes();
        list = ['a', 'a', 'a'];
        this.rerender({ list });
        this.assertHTML('aaa');
        this.assertStableNodes();
    }
    'it can render duplicate objects'() {
        let dup = { text: 'dup' };
        let list = [dup, dup, { text: 'uniq' }];
        this.render('{{#each list key="@index" as |item|}}{{item.text}}{{/each}}', {
            list,
        });
        this.assertHTML('dupdupuniq');
        this.assertStableRerender();
        list.push(dup);
        this.rerender({ list });
        this.assertHTML('dupdupuniqdup');
        this.assertStableNodes();
        list = [dup, dup, { text: 'uniq' }];
        this.rerender({ list });
        this.assertHTML('dupdupuniq');
        this.assertStableNodes();
    }
    'it renders all items with duplicate key values'() {
        let list = [{ text: 'Hello' }, { text: 'Hello' }, { text: 'Hello' }];
        this.render(`{{#each list key="@identity" as |item|}}{{item.text}}{{/each}}`, {
            list,
        });
        this.assertHTML('HelloHelloHello');
        this.assertStableRerender();
        list.forEach(item => (item.text = 'Goodbye'));
        this.rerender({ list });
        this.assertHTML('GoodbyeGoodbyeGoodbye');
        this.assertStableNodes();
        list = [{ text: 'Hello' }, { text: 'Hello' }, { text: 'Hello' }];
        this.rerender({ list });
        this.assertHTML('HelloHelloHello');
        this.assertStableNodes();
    }
    'scoped variable not available outside list'() {
        let list = ['Wycats'];
        this.render(`{{name}}-{{#each list key="@index" as |name|}}{{name}}{{/each}}-{{name}}`, {
            list,
            name: 'Stef',
        });
        this.assertHTML('Stef-Wycats-Stef');
        this.assertStableRerender();
        list.push(' ', 'Chad');
        this.rerender({ list });
        this.assertHTML('Stef-Wycats Chad-Stef');
        this.assertStableNodes();
        this.rerender({ name: 'Tom' });
        this.assertHTML('Tom-Wycats Chad-Tom');
        this.assertStableNodes();
        list = ['Wycats'];
        this.rerender({ list, name: 'Stef' });
        this.assertHTML('Stef-Wycats-Stef');
        this.assertStableNodes();
    }
    'else template is displayed with context'() {
        let list = [];
        this.render(`{{#each list key="@index" as |name|}}Has thing{{else}}No thing {{otherThing}}{{/each}}`, {
            list,
            otherThing: 'Chad',
        });
        this.assertHTML('No thing Chad');
        this.assertStableRerender();
        this.rerender({ otherThing: 'Bill' });
        this.assertHTML('No thing Bill');
        this.assertStableNodes();
        list.push('thing');
        this.rerender({ list });
        this.assertHTML('Has thing');
        this.assertStableNodes();
        this.rerender({ otherThing: 'Chad', list: [] });
        this.assertHTML('No thing Chad');
        this.assertStableNodes();
    }
}
EachSuite.suiteName = '#each';
__decorate([
    test
], EachSuite.prototype, "basic #each", null);
__decorate([
    test
], EachSuite.prototype, "keyed #each", null);
__decorate([
    test
], EachSuite.prototype, "receives the index as the second parameter", null);
__decorate([
    test
], EachSuite.prototype, "receives the index as the second parameter (when key=@identity)", null);
__decorate([
    test
], EachSuite.prototype, "it can render duplicate primitive items", null);
__decorate([
    test
], EachSuite.prototype, "it can render duplicate objects", null);
__decorate([
    test
], EachSuite.prototype, "it renders all items with duplicate key values", null);
__decorate([
    test
], EachSuite.prototype, "scoped variable not available outside list", null);
__decorate([
    test
], EachSuite.prototype, "else template is displayed with context", null);
function val(i) {
    return { val: i };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdWl0ZXMvZWFjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXpDLE1BQU0sT0FBTyxTQUFVLFNBQVEsVUFBVTtJQUl2QyxhQUFhO1FBQ1gsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLHFFQUFxRSxFQUFFO1lBQ2pGLElBQUk7U0FDTCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEIs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RDtJQURDLElBQUk7NENBd0JKO0FBR0Q7SUFEQyxJQUFJOzJFQXVCSjtBQUdEO0lBREMsSUFBSTtnR0FzQ0o7QUFHRDtJQURDLElBQUk7d0VBa0JKO0FBR0Q7SUFEQyxJQUFJO2dFQW1CSjtBQUdEO0lBREMsSUFBSTsrRUFzQko7QUFHRDtJQURDLElBQUk7MkVBMEJKO0FBR0Q7SUFEQyxJQUFJO3dFQTJCSjtBQUdILFNBQVMsR0FBRyxDQUFDLENBQVM7SUFDcEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyVGVzdCB9IGZyb20gJy4uL3JlbmRlci10ZXN0JztcbmltcG9ydCB7IHRlc3QgfSBmcm9tICcuLi90ZXN0LWRlY29yYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBFYWNoU3VpdGUgZXh0ZW5kcyBSZW5kZXJUZXN0IHtcbiAgc3RhdGljIHN1aXRlTmFtZSA9ICcjZWFjaCc7XG5cbiAgQHRlc3RcbiAgJ2Jhc2ljICNlYWNoJygpIHtcbiAgICBsZXQgbGlzdCA9IFsxLCAyLCAzLCA0XTtcbiAgICB0aGlzLnJlbmRlcigne3sjZWFjaCBsaXN0IGtleT1cIkBpbmRleFwiIGFzIHxpdGVtfH19e3tpdGVtfX17e2Vsc2V9fUVtcHR5e3svZWFjaH19Jywge1xuICAgICAgbGlzdCxcbiAgICB9KTtcbiAgICB0aGlzLmFzc2VydEhUTUwoJzEyMzQnKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZVJlcmVuZGVyKCk7XG5cbiAgICBsaXN0LnB1c2goNSwgNik7XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCcxMjM0NTYnKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG5cbiAgICBsaXN0ID0gW107XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdFbXB0eScpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlTm9kZXMoKTtcblxuICAgIGxpc3QgPSBbMSwgMiwgMywgNF07XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCcxMjM0Jyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuICB9XG5cbiAgQHRlc3RcbiAgJ2tleWVkICNlYWNoJygpIHtcbiAgICBsZXQgbGlzdCA9IFt7IHRleHQ6ICdoZWxsbycgfV07XG4gICAgdGhpcy5yZW5kZXIoJ3t7I2VhY2ggbGlzdCBrZXk9XCJ0ZXh0XCIgYXMgfGl0ZW18fX17e2l0ZW0udGV4dH19e3tlbHNlfX1FbXB0eXt7L2VhY2h9fScsIHtcbiAgICAgIGxpc3QsXG4gICAgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdoZWxsbycpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlUmVyZW5kZXIoKTtcblxuICAgIGxpc3QucHVzaCh7IHRleHQ6ICcgJyB9KTtcbiAgICBsaXN0LnB1c2goeyB0ZXh0OiAnV29ybGQnIH0pO1xuICAgIHRoaXMucmVyZW5kZXIoeyBsaXN0IH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnaGVsbG8gV29ybGQnKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG5cbiAgICBsaXN0ID0gW107XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdFbXB0eScpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlTm9kZXMoKTtcblxuICAgIGxpc3QgPSBbeyB0ZXh0OiAnaGVsbG8nIH1dO1xuICAgIHRoaXMucmVyZW5kZXIoeyBsaXN0IH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnaGVsbG8nKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG4gIH1cblxuICBAdGVzdFxuICAncmVjZWl2ZXMgdGhlIGluZGV4IGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyJygpIHtcbiAgICBsZXQgbGlzdCA9IFsxLCAyLCAzLCA0XTtcbiAgICB0aGlzLnJlbmRlcigne3sjZWFjaCBsaXN0IGtleT1cIkBpbmRleFwiIGFzIHxpdGVtIGl8fX17e2l0ZW19fS17e2l9fTp7e2Vsc2V9fUVtcHR5e3svZWFjaH19Jywge1xuICAgICAgbGlzdCxcbiAgICB9KTtcbiAgICB0aGlzLmFzc2VydEhUTUwoJzEtMDoyLTE6My0yOjQtMzonKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZVJlcmVuZGVyKCk7XG5cbiAgICBsaXN0LnB1c2goNSwgNik7XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCcxLTA6Mi0xOjMtMjo0LTM6NS00OjYtNTonKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG5cbiAgICBsaXN0ID0gW107XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdFbXB0eScpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlTm9kZXMoKTtcblxuICAgIGxpc3QgPSBbMSwgMiwgMywgNF07XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCcxLTA6Mi0xOjMtMjo0LTM6Jyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuICB9XG5cbiAgQHRlc3RcbiAgJ3JlY2VpdmVzIHRoZSBpbmRleCBhcyB0aGUgc2Vjb25kIHBhcmFtZXRlciAod2hlbiBrZXk9QGlkZW50aXR5KScoKSB7XG4gICAgbGV0IHYxID0gdmFsKDEpO1xuICAgIGxldCB2MiA9IHZhbCgyKTtcbiAgICBsZXQgdjMgPSB2YWwoMyk7XG4gICAgbGV0IHY0ID0gdmFsKDQpO1xuICAgIGxldCB2NSA9IHZhbCg1KTtcbiAgICBsZXQgdjYgPSB2YWwoNik7XG5cbiAgICBsZXQgbGlzdCA9IFt2MSwgdjIsIHYzLCB2NF07XG4gICAgdGhpcy5yZW5kZXIoXG4gICAgICAne3sjZWFjaCBsaXN0IGtleT1cIkBpZGVudGl0eVwiIGFzIHxpdGVtIGl8fX17e2l0ZW0udmFsfX0te3tpfX17e2Vsc2V9fUVtcHR5e3svZWFjaH19JyxcbiAgICAgIHtcbiAgICAgICAgbGlzdCxcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnMS0wMi0xMy0yNC0zJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVSZXJlbmRlcigpO1xuXG4gICAgbGlzdC5wdXNoKHY1LCB2Nik7XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCcxLTAyLTEzLTI0LTM1LTQ2LTUnKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG5cbiAgICB2MS52YWwgPSAxMDAwO1xuICAgIHRoaXMucmVyZW5kZXIoeyBsaXN0IH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnMTAwMC0wMi0xMy0yNC0zNS00Ni01Jyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuXG4gICAgbGlzdCA9IFtdO1xuICAgIHRoaXMucmVyZW5kZXIoeyBsaXN0IH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnRW1wdHknKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG5cbiAgICBsaXN0ID0gW3ZhbCgxKSwgdmFsKDIpLCB2YWwoMyksIHZhbCg0KV07XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCcxLTAyLTEzLTI0LTMnKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG4gIH1cblxuICBAdGVzdFxuICAnaXQgY2FuIHJlbmRlciBkdXBsaWNhdGUgcHJpbWl0aXZlIGl0ZW1zJygpIHtcbiAgICBsZXQgbGlzdCA9IFsnYScsICdhJywgJ2EnXTtcbiAgICB0aGlzLnJlbmRlcigne3sjZWFjaCBsaXN0IGtleT1cIkBpbmRleFwiIGFzIHxpdGVtfH19e3tpdGVtfX17ey9lYWNofX0nLCB7XG4gICAgICBsaXN0LFxuICAgIH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnYWFhJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVSZXJlbmRlcigpO1xuXG4gICAgbGlzdC5wdXNoKCdhJywgJ2EnKTtcbiAgICB0aGlzLnJlcmVuZGVyKHsgbGlzdCB9KTtcbiAgICB0aGlzLmFzc2VydEhUTUwoJ2FhYWFhJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuXG4gICAgbGlzdCA9IFsnYScsICdhJywgJ2EnXTtcbiAgICB0aGlzLnJlcmVuZGVyKHsgbGlzdCB9KTtcbiAgICB0aGlzLmFzc2VydEhUTUwoJ2FhYScpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlTm9kZXMoKTtcbiAgfVxuXG4gIEB0ZXN0XG4gICdpdCBjYW4gcmVuZGVyIGR1cGxpY2F0ZSBvYmplY3RzJygpIHtcbiAgICBsZXQgZHVwID0geyB0ZXh0OiAnZHVwJyB9O1xuICAgIGxldCBsaXN0ID0gW2R1cCwgZHVwLCB7IHRleHQ6ICd1bmlxJyB9XTtcbiAgICB0aGlzLnJlbmRlcigne3sjZWFjaCBsaXN0IGtleT1cIkBpbmRleFwiIGFzIHxpdGVtfH19e3tpdGVtLnRleHR9fXt7L2VhY2h9fScsIHtcbiAgICAgIGxpc3QsXG4gICAgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdkdXBkdXB1bmlxJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVSZXJlbmRlcigpO1xuXG4gICAgbGlzdC5wdXNoKGR1cCk7XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdkdXBkdXB1bmlxZHVwJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuXG4gICAgbGlzdCA9IFtkdXAsIGR1cCwgeyB0ZXh0OiAndW5pcScgfV07XG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdkdXBkdXB1bmlxJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuICB9XG5cbiAgQHRlc3RcbiAgJ2l0IHJlbmRlcnMgYWxsIGl0ZW1zIHdpdGggZHVwbGljYXRlIGtleSB2YWx1ZXMnKCkge1xuICAgIGxldCBsaXN0ID0gW3sgdGV4dDogJ0hlbGxvJyB9LCB7IHRleHQ6ICdIZWxsbycgfSwgeyB0ZXh0OiAnSGVsbG8nIH1dO1xuXG4gICAgdGhpcy5yZW5kZXIoYHt7I2VhY2ggbGlzdCBrZXk9XCJAaWRlbnRpdHlcIiBhcyB8aXRlbXx9fXt7aXRlbS50ZXh0fX17ey9lYWNofX1gLCB7XG4gICAgICBsaXN0LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hc3NlcnRIVE1MKCdIZWxsb0hlbGxvSGVsbG8nKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZVJlcmVuZGVyKCk7XG5cbiAgICBsaXN0LmZvckVhY2goaXRlbSA9PiAoaXRlbS50ZXh0ID0gJ0dvb2RieWUnKSk7XG5cbiAgICB0aGlzLnJlcmVuZGVyKHsgbGlzdCB9KTtcbiAgICB0aGlzLmFzc2VydEhUTUwoJ0dvb2RieWVHb29kYnllR29vZGJ5ZScpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlTm9kZXMoKTtcblxuICAgIGxpc3QgPSBbeyB0ZXh0OiAnSGVsbG8nIH0sIHsgdGV4dDogJ0hlbGxvJyB9LCB7IHRleHQ6ICdIZWxsbycgfV07XG5cbiAgICB0aGlzLnJlcmVuZGVyKHsgbGlzdCB9KTtcbiAgICB0aGlzLmFzc2VydEhUTUwoJ0hlbGxvSGVsbG9IZWxsbycpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlTm9kZXMoKTtcbiAgfVxuXG4gIEB0ZXN0XG4gICdzY29wZWQgdmFyaWFibGUgbm90IGF2YWlsYWJsZSBvdXRzaWRlIGxpc3QnKCkge1xuICAgIGxldCBsaXN0ID0gWydXeWNhdHMnXTtcblxuICAgIHRoaXMucmVuZGVyKGB7e25hbWV9fS17eyNlYWNoIGxpc3Qga2V5PVwiQGluZGV4XCIgYXMgfG5hbWV8fX17e25hbWV9fXt7L2VhY2h9fS17e25hbWV9fWAsIHtcbiAgICAgIGxpc3QsXG4gICAgICBuYW1lOiAnU3RlZicsXG4gICAgfSk7XG5cbiAgICB0aGlzLmFzc2VydEhUTUwoJ1N0ZWYtV3ljYXRzLVN0ZWYnKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZVJlcmVuZGVyKCk7XG5cbiAgICBsaXN0LnB1c2goJyAnLCAnQ2hhZCcpO1xuICAgIHRoaXMucmVyZW5kZXIoeyBsaXN0IH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnU3RlZi1XeWNhdHMgQ2hhZC1TdGVmJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuXG4gICAgdGhpcy5yZXJlbmRlcih7IG5hbWU6ICdUb20nIH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnVG9tLVd5Y2F0cyBDaGFkLVRvbScpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlTm9kZXMoKTtcblxuICAgIGxpc3QgPSBbJ1d5Y2F0cyddO1xuXG4gICAgdGhpcy5yZXJlbmRlcih7IGxpc3QsIG5hbWU6ICdTdGVmJyB9KTtcbiAgICB0aGlzLmFzc2VydEhUTUwoJ1N0ZWYtV3ljYXRzLVN0ZWYnKTtcbiAgICB0aGlzLmFzc2VydFN0YWJsZU5vZGVzKCk7XG4gIH1cblxuICBAdGVzdFxuICAnZWxzZSB0ZW1wbGF0ZSBpcyBkaXNwbGF5ZWQgd2l0aCBjb250ZXh0JygpIHtcbiAgICBsZXQgbGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgIHRoaXMucmVuZGVyKFxuICAgICAgYHt7I2VhY2ggbGlzdCBrZXk9XCJAaW5kZXhcIiBhcyB8bmFtZXx9fUhhcyB0aGluZ3t7ZWxzZX19Tm8gdGhpbmcge3tvdGhlclRoaW5nfX17ey9lYWNofX1gLFxuICAgICAge1xuICAgICAgICBsaXN0LFxuICAgICAgICBvdGhlclRoaW5nOiAnQ2hhZCcsXG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMuYXNzZXJ0SFRNTCgnTm8gdGhpbmcgQ2hhZCcpO1xuICAgIHRoaXMuYXNzZXJ0U3RhYmxlUmVyZW5kZXIoKTtcblxuICAgIHRoaXMucmVyZW5kZXIoeyBvdGhlclRoaW5nOiAnQmlsbCcgfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdObyB0aGluZyBCaWxsJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuXG4gICAgbGlzdC5wdXNoKCd0aGluZycpO1xuICAgIHRoaXMucmVyZW5kZXIoeyBsaXN0IH0pO1xuICAgIHRoaXMuYXNzZXJ0SFRNTCgnSGFzIHRoaW5nJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuXG4gICAgdGhpcy5yZXJlbmRlcih7IG90aGVyVGhpbmc6ICdDaGFkJywgbGlzdDogW10gfSk7XG4gICAgdGhpcy5hc3NlcnRIVE1MKCdObyB0aGluZyBDaGFkJyk7XG4gICAgdGhpcy5hc3NlcnRTdGFibGVOb2RlcygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbChpOiBudW1iZXIpOiB7IHZhbDogbnVtYmVyIH0ge1xuICByZXR1cm4geyB2YWw6IGkgfTtcbn1cbiJdfQ==