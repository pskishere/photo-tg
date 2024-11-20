import { useState, useRef } from 'react';
import { 
  Section, 
  Cell, 
  Button,
  List,
} from '@telegram-apps/telegram-ui';
import type { FC, ChangeEvent } from 'react';
import { Page } from '@/components/Page';

// 完整的尺寸配置
const sizeDimensions: Record<string, { width: string; height: string }> = {
  '一寸 (25x35mm)': { width: '25', height: '35' },
  '自定义': { width: '', height: '' },
  '驾驱证 (22x32mm)': { width: '22', height: '32' },
  '二寸 (35x49mm)': { width: '35', height: '49' },
  '小一寸 (22x32mm)': { width: '22', height: '32' },
  '小二寸 (35x45mm)': { width: '35', height: '45' },
  '简历照 (25x35mm)': { width: '25', height: '35' },
  '硕士研究生考试报名 (41x54mm)': { width: '41', height: '54' },
  '英语四六级 (33x48mm)': { width: '33', height: '48' },
  '在职研究生考试 (33x48mm)': { width: '33', height: '48' },
  '教师资格证 (41x54mm)': { width: '41', height: '54' },
  '全国英语等级考试 (33x48mm)': { width: '33', height: '48' },
  '英语AB级 (15x20mm)': { width: '15', height: '20' },
  '2023年英语专 (25x35mm)': { width: '25', height: '35' },
  '成人本科学位考试 (33x48mm)': { width: '33', height: '48' },
  '全国职称英语等级考试 (36x49mm)': { width: '36', height: '49' },
  '全国翻译专业资格考试 (35x49mm)': { width: '35', height: '49' },
  '全国商务英语翻译考试 (25x35mm)': { width: '25', height: '35' },
  '医护英语考试 (35x49mm)': { width: '35', height: '49' },
  '学位英语报名 (35x53mm)': { width: '35', height: '53' },
  '普通话水平测试 (33x48mm)': { width: '33', height: '48' },
  '韩语能力考试 (30x41mm)': { width: '30', height: '41' },
  '托业考试 (32x41mm)': { width: '32', height: '41' },
  '托福考试 (25x35mm)': { width: '25', height: '35' },
  '日语鉴定考试 (29x40mm)': { width: '29', height: '40' },
  '法语学习考试 (35x49mm)': { width: '35', height: '49' },
  '外语口译证书 (33x48mm)': { width: '33', height: '48' },
  '雅思 (33x48mm)': { width: '33', height: '48' }
};

const colors = ['#02A7F0', '#D9001B', '#FFFFFF', '#3492C4', '#3D99E2'];

// 自定义样式
const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '10px',
  },
  previewSection: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginBottom: 20,
  },
  imagePreview: {
    minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative' as const,
    padding: '20px',
  },
  imagesWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    gap: '30px',
  },
  imageSection: {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const,
  },
  processedImage: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  imageLabel: {
    fontSize: 18,
    color: '#4c51bf',
    marginBottom: 15,
    fontWeight: 500,
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    background: 'linear-gradient(to bottom right, #ebf8ff, #d6bcfa)',
    color: '#5a67d8',
    textAlign: 'center' as const,
    padding: '0 10px',
  },
  placeholderIcon: {
    fontSize: 60,
    marginBottom: 15,
    color: '#4c51bf',
  },
  optionsSection: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: 20,
    marginTop: 20,
  },
  sizeInputs: {
    display: 'flex',
    gap: 10,
    padding: '10px 0',
  },
  colorOptions: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
    padding: '12px 0',
  },
  colorCircle: (isSelected: boolean) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    border: isSelected ? '2px solid #4c51bf' : 'none',
  }),
  actionButton: {
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '12px 20px',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  printButton: {
    background: 'linear-gradient(to right, #ed64a6, #f6ad55)',
  },
  infoBox: {
    background: '#ebf4ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  infoText: {
    color: '#5a67d8',
    fontSize: 14,
    lineHeight: 1.5,
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#4c51bf',
    borderRadius: '50%',
    width: 30,
    height: 30,
    animation: 'spin 1s linear infinite',
    marginRight: 10,
  },
  loadingOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#5a67d8',
    zIndex: 10,
  },
  saveButton: {
    width: '100%',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '12px 20px',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  savePrintButton: {
    background: 'linear-gradient(to right, #ed64a6, #f6ad55)',
  },
  buttonIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
};

export const IndexPage: FC = () => {
  // 状态管理
  const [selectedSizeName, setSelectedSizeName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedColor, setSelectedColor] = useState('#02A7F0');
  const [transparentImageBase64, setTransparentImageBase64] = useState('');
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [printImageUrl, setPrintImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 毫米转像素
  const mmToPx = (mm: number, dpi = 300) => {
    return Math.round((mm / 25.4) * dpi);
  };

  // 修改事件处理器类型
  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSizeName(value);
    
    if (value === '自定义') {
      setWidth('');
      setHeight('');
    } else {
      const dimensions = sizeDimensions[value];
      if (dimensions) {
        setWidth(dimensions.width);
        setHeight(dimensions.height);
      }
    }
  };

  // Base64 转 Blob
  const base64ToBlob = (base64: string, mime: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  };

  // 生成随机字符串用于文件命名
  const generateRandomString = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // 处理图片上传
  const handleFileUpload = async (file: File) => {
    const widthMm = parseFloat(width);
    const heightMm = parseFloat(height);
    
    if (isNaN(widthMm) || isNaN(heightMm) || widthMm <= 0 || heightMm <= 0) {
      alert('请输入有效的宽度和高度');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('input_image', file);
      formData.append('width', mmToPx(widthMm).toString());
      formData.append('height', mmToPx(heightMm).toString());
      formData.append('human_matting_model', 'hivision_modnet');
      formData.append('face_detect_model', 'mtcnn');
      formData.append('hd', 'false');

      const response = await fetch('https://idphotos.maicai.site/idphoto', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status === true) {
        if (data.image_base64_hd) {
          setTransparentImageBase64(data.image_base64_hd.replace(/^data:image\/\w+;base64,/, ''));
        } else if (data.image_base64_standard) {
          setTransparentImageBase64(data.image_base64_standard.replace(/^data:image\/\w+;base64,/, ''));
        } else {
          alert('未获取到处理后的图片');
          setIsLoading(false);
          return;
        }
        await addBackgroundToImage();
      } else {
        alert('图片处理失败');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API 调用失败：', error);
      alert('上传失败');
      setIsLoading(false);
    }
  };

  // 添加背景色
  const addBackgroundToImage = async () => {
    if (!transparentImageBase64) {
      alert('处理失败：无透明人像数据');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      const blob = base64ToBlob(transparentImageBase64, 'image/png');
      formData.append('input_image', blob, `transparent_${generateRandomString()}.png`);
      formData.append('color', selectedColor.slice(1)); // 去掉 '#'
      formData.append('kb', '200');
      formData.append('render', '0');

      const response = await fetch('https://idphotos.maicai.site/add_background', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status === true && data.image_base64) {
        setProcessedImageUrl(`data:image/png;base64,${data.image_base64.replace(/^data:image\/\w+;base64,/, '')}`);
      } else {
        alert('背景添加失败');
      }
    } catch (error) {
      console.error('调用 AddBackground API 失败：', error);
      alert('背景添加失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 生成打印版
  const generatePrintVersion = async () => {
    if (!processedImageUrl) {
      alert('请先处理照片');
      return;
    }

    setIsLoading(true);

    try {
      // 提取 Base64 数据并转换为 Blob
      const base64Data = processedImageUrl.split(',')[1];
      const blob = base64ToBlob(base64Data, 'image/png');

      const formData = new FormData();
      formData.append('input_image', blob, `print_version_${generateRandomString()}.png`);
      formData.append('width', mmToPx(parseFloat(width)).toString());
      formData.append('height', mmToPx(parseFloat(height)).toString());
      formData.append('kb', '200');

      const response = await fetch('https://idphotos.maicai.site/generate_layout_photos', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status === true && data.image_base64) {
        setPrintImageUrl(`data:image/png;base64,${data.image_base64.replace(/^data:image\/\w+;base64,/, '')}`);
      } else {
        alert('打印版生成失败');
      }
    } catch (error) {
      console.error('调用 GeneratePrintVersion API 失败：', error);
      alert('生成失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 下载图片
  const downloadImage = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Page>
      <div style={styles.container}>
        <List>
          {/* 标题区域 */}
          <Section header="证件照生成器" style={styles.previewSection}>
            <Cell>快速生成标准证件照</Cell>
          </Section>

          {/* 照片预览区域 */}
          <Section header="照片预览" style={styles.previewSection}>
            <div style={styles.imagePreview}>
              {isLoading ? (
                <div style={styles.loadingOverlay}>
                  <div style={styles.spinner}></div>
                  <span>处理中...</span>
                </div>
              ) : (processedImageUrl || printImageUrl) ? (
                <div style={styles.imagesWrapper}>
                  {processedImageUrl && (
                    <div style={styles.imageSection}>
                      <div style={styles.imageLabel}>标准版</div>
                      <img 
                        src={processedImageUrl} 
                        alt="标准版照片"
                        style={styles.processedImage}
                      />
                      <button 
                        onClick={() => downloadImage(processedImageUrl, `standard_${Date.now()}.png`)}
                        style={styles.saveButton}
                      >
                        <i className="fas fa-download" style={styles.buttonIcon}></i>
                        保存标准版
                      </button>
                    </div>
                  )}
                  {printImageUrl && (
                    <div style={styles.imageSection}>
                      <div style={styles.imageLabel}>打印版</div>
                      <img 
                        src={printImageUrl} 
                        alt="打印版照片"
                        style={styles.processedImage}
                      />
                      <button 
                        onClick={() => downloadImage(printImageUrl, `print_${Date.now()}.png`)}
                        style={{...styles.saveButton, ...styles.savePrintButton}}
                      >
                        <i className="fas fa-download" style={styles.buttonIcon}></i>
                        保存打印版
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={styles.placeholder}>
                  <i className="fas fa-camera" style={styles.placeholderIcon}></i>
                  <div>请先选择尺寸和背景颜色，然后点击下方选择照片按钮开始</div>
                </div>
              )}
            </div>
          </Section>

          {/* 编辑选项区域 */}
          <Section style={styles.optionsSection}>
            {/* 尺寸选择 */}
            <Cell>
              <select
                value={selectedSizeName}
                onChange={handleSizeChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #c3dafe',
                  backgroundColor: '#fff',
                  color: '#4c51bf',
                  fontSize: '14px',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%234c51bf' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '16px 16px',
                }}
              >
                <option value="" disabled>请选择尺寸</option>
                {Object.keys(sizeDimensions).map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </Cell>
            
            {selectedSizeName === '自定义' && (
              <Cell>
                <div style={styles.sizeInputs}>
                  <input
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="宽度(mm)"
                    type="number"
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid #c3dafe',
                      backgroundColor: '#fff',
                      color: '#4c51bf',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="高度(mm)"
                    type="number"
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px solid #c3dafe',
                      backgroundColor: '#fff',
                      color: '#4c51bf',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </Cell>
            )}

            {/* 背景颜色选择 */}
            <Cell>
              <div style={styles.colorOptions}>
                {colors.map(color => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      ...styles.colorCircle(selectedColor === color),
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
            </Cell>

            {/* 提示信息 */}
            <div style={styles.infoBox}>
              <div style={styles.infoText}>
                选择合适的尺寸和背景颜色，然后点击"选择照片"上传您的人像照片。我们将自动处理并生成符合要求的证件照。
              </div>
            </div>
          </Section>

          {/* 操作按钮 */}
          <Section>
            <Cell>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={!selectedSizeName || !width || !height}
                style={styles.actionButton}
              >
                选择照片
              </Button>
            </Cell>
            <Cell>
              <Button
                onClick={generatePrintVersion}
                disabled={!processedImageUrl}
                style={{...styles.actionButton, ...styles.printButton}}
              >
                生成打印版
              </Button>
            </Cell>
          </Section>

          {/* 隐藏的文件输入 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            style={{ display: 'none' }}
          />
        </List>
      </div>
    </Page>
  );
};
