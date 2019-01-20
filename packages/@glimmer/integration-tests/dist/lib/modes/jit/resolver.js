import { TestJitRegistry } from './registry';
import { createTemplate } from '../../compile';
export default class TestJitRuntimeResolver {
    constructor() {
        this.registry = new TestJitRegistry();
    }
    lookup(type, name, referrer) {
        return this.registry.lookup(type, name, referrer);
    }
    getInvocation(_locator) {
        throw new Error(`getInvocation is not supported in JIT mode`);
    }
    compilable(locator) {
        let compile = (source) => {
            return createTemplate(source).create();
        };
        let handle = this.lookup('template-source', locator.module);
        return this.registry.customCompilableTemplate(handle, name, compile);
    }
    lookupHelper(name, referrer) {
        return this.lookup('helper', name, referrer);
    }
    lookupModifier(name, referrer) {
        return this.lookup('modifier', name, referrer);
    }
    lookupComponent(name, referrer) {
        let handle = this.registry.lookupComponentHandle(name, referrer);
        if (handle === null)
            return null;
        return this.resolve(handle);
    }
    lookupPartial(name, referrer) {
        return this.lookup('partial', name, referrer);
    }
    resolve(handle) {
        return this.registry.resolve(handle);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvbW9kZXMvaml0L3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxNQUFNLENBQUMsT0FBTyxPQUFPLHNCQUFzQjtJQUEzQztRQUNXLGFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBeUQ1QyxDQUFDO0lBdkRDLE1BQU0sQ0FDSixJQUFnQixFQUNoQixJQUFZLEVBQ1osUUFBdUQ7UUFFdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxhQUFhLENBQUMsUUFBOEM7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBNkM7UUFDdEQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUMvQixPQUFPLGNBQWMsQ0FBeUIsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakUsQ0FBQyxDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFFLENBQUM7UUFFN0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELFlBQVksQ0FDVixJQUFZLEVBQ1osUUFBdUQ7UUFFdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGNBQWMsQ0FDWixJQUFZLEVBQ1osUUFBdUQ7UUFFdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELGVBQWUsQ0FDYixJQUFZLEVBQ1osUUFBc0Q7UUFFdEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakUsSUFBSSxNQUFNLEtBQUssSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQXdCLENBQUM7SUFDckQsQ0FBQztJQUVELGFBQWEsQ0FDWCxJQUFZLEVBQ1osUUFBdUQ7UUFFdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE9BQU8sQ0FBSSxNQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSml0UnVudGltZVJlc29sdmVyLFxuICBUZW1wbGF0ZU1ldGEsXG4gIEFubm90YXRlZE1vZHVsZUxvY2F0b3IsXG4gIE9wdGlvbixcbiAgQ29tcG9uZW50RGVmaW5pdGlvbixcbiAgVGVtcGxhdGUsXG4gIEludm9jYXRpb24sXG59IGZyb20gJ0BnbGltbWVyL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTG9va3VwVHlwZSwgVGVzdEppdFJlZ2lzdHJ5IH0gZnJvbSAnLi9yZWdpc3RyeSc7XG5pbXBvcnQgeyBjcmVhdGVUZW1wbGF0ZSB9IGZyb20gJy4uLy4uL2NvbXBpbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0Sml0UnVudGltZVJlc29sdmVyIGltcGxlbWVudHMgSml0UnVudGltZVJlc29sdmVyIHtcbiAgcmVhZG9ubHkgcmVnaXN0cnkgPSBuZXcgVGVzdEppdFJlZ2lzdHJ5KCk7XG5cbiAgbG9va3VwKFxuICAgIHR5cGU6IExvb2t1cFR5cGUsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHJlZmVycmVyPzogT3B0aW9uPFRlbXBsYXRlTWV0YTxBbm5vdGF0ZWRNb2R1bGVMb2NhdG9yPj5cbiAgKTogT3B0aW9uPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5Lmxvb2t1cCh0eXBlLCBuYW1lLCByZWZlcnJlcik7XG4gIH1cblxuICBnZXRJbnZvY2F0aW9uKF9sb2NhdG9yOiBUZW1wbGF0ZU1ldGE8QW5ub3RhdGVkTW9kdWxlTG9jYXRvcj4pOiBJbnZvY2F0aW9uIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGdldEludm9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCBpbiBKSVQgbW9kZWApO1xuICB9XG5cbiAgY29tcGlsYWJsZShsb2NhdG9yOiBUZW1wbGF0ZU1ldGE8QW5ub3RhdGVkTW9kdWxlTG9jYXRvcj4pOiBUZW1wbGF0ZSB7XG4gICAgbGV0IGNvbXBpbGUgPSAoc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBjcmVhdGVUZW1wbGF0ZTxBbm5vdGF0ZWRNb2R1bGVMb2NhdG9yPihzb3VyY2UpLmNyZWF0ZSgpO1xuICAgIH07XG5cbiAgICBsZXQgaGFuZGxlID0gdGhpcy5sb29rdXAoJ3RlbXBsYXRlLXNvdXJjZScsIGxvY2F0b3IubW9kdWxlKSE7XG5cbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5jdXN0b21Db21waWxhYmxlVGVtcGxhdGUoaGFuZGxlLCBuYW1lLCBjb21waWxlKTtcbiAgfVxuXG4gIGxvb2t1cEhlbHBlcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcmVmZXJyZXI/OiBPcHRpb248VGVtcGxhdGVNZXRhPEFubm90YXRlZE1vZHVsZUxvY2F0b3I+PlxuICApOiBPcHRpb248bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMubG9va3VwKCdoZWxwZXInLCBuYW1lLCByZWZlcnJlcik7XG4gIH1cblxuICBsb29rdXBNb2RpZmllcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcmVmZXJyZXI/OiBPcHRpb248VGVtcGxhdGVNZXRhPEFubm90YXRlZE1vZHVsZUxvY2F0b3I+PlxuICApOiBPcHRpb248bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMubG9va3VwKCdtb2RpZmllcicsIG5hbWUsIHJlZmVycmVyKTtcbiAgfVxuXG4gIGxvb2t1cENvbXBvbmVudChcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcmVmZXJyZXI6IE9wdGlvbjxUZW1wbGF0ZU1ldGE8QW5ub3RhdGVkTW9kdWxlTG9jYXRvcj4+XG4gICk6IE9wdGlvbjxDb21wb25lbnREZWZpbml0aW9uPiB7XG4gICAgbGV0IGhhbmRsZSA9IHRoaXMucmVnaXN0cnkubG9va3VwQ29tcG9uZW50SGFuZGxlKG5hbWUsIHJlZmVycmVyKTtcbiAgICBpZiAoaGFuZGxlID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlKGhhbmRsZSkgYXMgQ29tcG9uZW50RGVmaW5pdGlvbjtcbiAgfVxuXG4gIGxvb2t1cFBhcnRpYWwoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHJlZmVycmVyPzogT3B0aW9uPFRlbXBsYXRlTWV0YTxBbm5vdGF0ZWRNb2R1bGVMb2NhdG9yPj5cbiAgKTogT3B0aW9uPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmxvb2t1cCgncGFydGlhbCcsIG5hbWUsIHJlZmVycmVyKTtcbiAgfVxuXG4gIHJlc29sdmU8VD4oaGFuZGxlOiBudW1iZXIpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5yZXNvbHZlKGhhbmRsZSk7XG4gIH1cbn1cbiJdfQ==