import { Injectable } from '@angular/core';
import { WindowWrapper } from '../models/window-wrapper.model';

function getWindow(): WindowWrapper {
  return window as WindowWrapper;
}

@Injectable(({ providedIn: 'root'}) as any)
export class WindowService {
  get nativeWindow(): WindowWrapper {
    return getWindow();
  }
}
